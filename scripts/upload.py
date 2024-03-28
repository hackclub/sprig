import glob
import serial
import time

sprigport = max(glob.glob('/dev/ttyACM*'))
print(sprigport)

ser = serial.Serial(sprigport, 115200, serial.EIGHTBITS, serial.PARITY_NONE, serial.STOPBITS_ONE, 0, True)


print('writing startup sequence')
startsequence = bytearray([0, 1, 2, 3, 4])
ser.write(startsequence)
print(startsequence)
#ser.flush()
#time.sleep(0.2)

file_path = "sokoban.js"  #set path of game to upload

with open(file_path, 'rb') as file:  #open the file
    byte_array = file.read() #save contents to variable

byte_array_length = len(byte_array)  # Get the length of the byte array
length_uint32_array = bytearray(byte_array_length.to_bytes(4, byteorder='little')) #convert that length into a Uint32Array

print('writing game length')
ser.write(length_uint32_array)
print(byte_array_length)
#ser.flush()
#time.sleep(1)

print('writing game data')
ser.write(byte_array)
ser.flush()
#time.sleep(0.5)
ser.close()

