/**
 * Driver for the PC audio system. All actual sound generation code is in shared/audio/piano.c.
 */

#include <CoreAudio/CoreAudio.h>
#include <AudioUnit/AudioUnit.h>
#include <pthread.h>

#ifdef SPADE_AUTOMATED
  #define puts(...) ;
  #define printf(...) ;
#endif

#include "shared/audio/piano.c"
#include "shared/audio/audio.h"

static  int audio_hw_init   (void);
static void audio_hw_cleanup(void);
static  int audio_open   (AURenderCallbackStruct *callback);
static void audio_close  (void);

static OSStatus audio_cb(
  void *inRef,
  AudioUnitRenderActionFlags *ioActionFlags,
  const AudioTimeStamp *inTimeStamp,
  uint32_t inBusNumber,
  uint32_t inNumberFrames,
  AudioBufferList *ioData
);

typedef enum {
  SampleBufState_Empty,
  SampleBufState_Full,
} SampleBufState;
typedef struct {
  // stops try_push from infinilooping before audiocore launches
  SampleBufState state;

  pthread_mutex_t mutex;
  int16_t samples[SAMPLES_PER_BUFFER];
} SampleBuf;

static SampleBuf sample_bufs[3] = {0};

void audio_init(void) {
  audio_hw_init();

  // locked for audio_cb
  pthread_mutex_lock(&sample_bufs[0].mutex);

  audio_open(&(AURenderCallbackStruct) { .inputProc = audio_cb });
}

void audio_try_push_samples(void) {
  static int writer = 0;
  while (1) {
    SampleBuf *sb = sample_bufs + writer;
    if (!pthread_mutex_trylock(&sb->mutex)) return;

    // stops us from infinilooping before audiocore launches
    if (sb->state == SampleBufState_Full) {
      pthread_mutex_unlock(&sb->mutex);
      return;
    }

    piano_fill_sample_buf(sb->samples, SAMPLES_PER_BUFFER);
    sb->state = SampleBufState_Full;

    pthread_mutex_unlock(&sb->mutex);
    writer = (writer + 1) % (sizeof(sample_bufs) / sizeof(sample_bufs[0]));
  }
}

static OSStatus audio_cb(
  void *inRef,
  AudioUnitRenderActionFlags *ioActionFlags,
  const AudioTimeStamp *inTimeStamp,
  uint32_t inBusNumber,
  uint32_t inNumberFrames,
  AudioBufferList *ioData
) {

  // get a pointer to where our samples need to go
  int channel = 0;
  int16_t *buffer = (int16_t *)ioData->mBuffers[channel].mData;

  static int reader = 0;
  static int reader_prog = 0;

  for (int i = 0; i < inNumberFrames; i++) {
    SampleBuf *sb = sample_bufs + reader;

    buffer[i] = sb->samples[reader_prog++];

    if (reader_prog == SAMPLES_PER_BUFFER) {
      sb->state = SampleBufState_Empty;
      pthread_mutex_unlock(&sb->mutex);

      reader_prog = 0;
      reader = (reader + 1) % (sizeof(sample_bufs) / sizeof(sample_bufs[0]));

      sb = sample_bufs + reader;
      pthread_mutex_lock(&sb->mutex);
    }
  }

  return noErr;
}

#if 0
int main(void) {
  audio_hw_init();

  audio_open(&(AURenderCallbackStruct) { .inputProc = audio_cb });

  // sleep 1s, rendering via callback happens in another thread
  usleep(1000000);

  audio_close();
  audio_hw_cleanup();
}
#endif

static AudioComponent output_comp;
static AudioComponentInstance output_instance;

static int audio_hw_init(void) {
  // open the default audio device
  output_comp = AudioComponentFindNext(NULL, &(AudioComponentDescription) {
    .componentType = kAudioUnitType_Output,
    .componentSubType = kAudioUnitSubType_DefaultOutput,
    .componentFlags = 0,
    .componentFlagsMask = 0,
    .componentManufacturer = kAudioUnitManufacturer_Apple,
  });

  if (!output_comp) {
    fprintf(stderr, "Failed to open default audio device.\n");
    return 0;
  }

  if (AudioComponentInstanceNew(output_comp, &output_instance)) {
    fprintf(stderr, "Failed to open default audio device.\n");
    return 0;
  }

  return 1;
}

static void audio_hw_cleanup(void) {
  AudioComponentInstanceDispose(output_instance);
}

static  int audio_open(AURenderCallbackStruct *callback) {
  if (AudioUnitInitialize(output_instance)) {
    fprintf (stderr, "Unable to initialize audio unit instance\n");
    return 0;
  }

  const int CHAN = 1;
  const int BYTES_PER_SAMPLE = 2;
  AudioStreamBasicDescription streamFormat = {
    .mSampleRate = SAMPLES_PER_SECOND,
    .mFormatID = kAudioFormatLinearPCM,
    .mFormatFlags = kAudioFormatFlagIsSignedInteger, // kAudioFormatFlagIsBigEndian ?
    .mFramesPerPacket = 1,
    .mChannelsPerFrame = CHAN,
    .mBitsPerChannel = BYTES_PER_SAMPLE * 8,
    .mBytesPerPacket = CHAN * BYTES_PER_SAMPLE,
    .mBytesPerFrame = CHAN * BYTES_PER_SAMPLE,
  };

  // pass in input format
  if (AudioUnitSetProperty(
    output_instance,
    kAudioUnitProperty_StreamFormat,
    kAudioUnitScope_Input,
    0,
    &streamFormat,
    sizeof(streamFormat)
  )) {
    fprintf(stderr, "Failed to set audio unit input property.\n");
    return 0;
  }

  // pass in callback
  if (AudioUnitSetProperty(
    output_instance,
    kAudioUnitProperty_SetRenderCallback,
    kAudioUnitScope_Input,
    0,
    callback,
    sizeof(AURenderCallbackStruct)
  )) {
    fprintf(stderr, "Unable to attach an IOProc to the selected audio unit.\n");
    return 0;
  }

  // start 'er up
  if (AudioOutputUnitStart(output_instance)) {
    printf("Unable to start audio unit.\n");
    return 0;
  }

  return 1;
}

static void audio_close(void) {
  AudioOutputUnitStop(output_instance);
}
