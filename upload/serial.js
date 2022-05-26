/* shamelessly stolen from kaluma
 * https://raw.githubusercontent.com/kaluma-project/kaluma-project.github.io/master/src/components/ide/serial.js
 */

import { EventEmitter } from '../upload/event_emitter.js';

export class Serial extends EventEmitter {
  constructor(serial) {
    super();
    this.serial = serial;
    this.reader = null;
  }

  async getInfo() {
    return this.serial.getInfo();
  }

  open(options) {
    return new Promise((resolve, reject) => {
      this.serial
        .open(options)
        .then(() => {
          const readLoop = () => {
            const reader = this.serial.readable.getReader();
            this.reader = reader;
            reader
              .read()
              .then(({ value, done }) => {
                reader.releaseLock();
                if (value) {
                  this.emit('data', value);
                }
                if (done) {
                  // disconnect
                  // console.log('disconnect in readLoop()');
                } else {
                  readLoop();
                }
              })
              .catch((err) => {
                console.log(err);
                this.emit('disconnect');
              });
          };
          readLoop();
          this.emit('connect');
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      if (this.reader) {
        this.reader
          .cancel()
          .then(() => this.serial.close())
          .then(() => resolve())
          .catch((err) => reject(err));
      } else {
        this.reader = null;
        this.serial
          .close()
          .then(() => resolve())
          .catch((err) => reject(err));
      }
    });
  }

  write(data, encoding = 'string') {
    return new Promise((resolve, reject) => {
      const writer = this.serial.writable.getWriter();
      if (encoding === 'string') {
        const encoder = new TextEncoder();
        writer
          .write(encoder.encode(data))
          .then(() => resolve())
          .catch((err) => reject(err));
      } else if (encoding === 'binary') {
        writer
          .write(data)
          .then(() => resolve())
          .catch((err) => reject(err));
      }
      writer.releaseLock();
    });
  }
}
