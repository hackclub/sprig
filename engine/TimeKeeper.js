class TimeKeeper {
  constructor() {
    this.accTime = 0;
    this.timers = new Set();
  }

  addTimer(fn, time) {
    const key = Math.random().toString(36).slice(2);

    const timer = { fn, interval: time*1000, dt: 0 };

    this.timers.add(timer);

    return { remove: () => removeTimer(key) };
  }

  removeTimer(timer) {
    this.timers.delete(timer);
  }

  clear() {
    this.timers.clear();
    this.accTime = 0;
  }

  update(timeStep) {
    // console.log("timeStep", timeStep);
    this.accTime += timeStep;

    this.timers.forEach(timer => {
      timer.dt += timeStep;
      while (timer.dt > timer.interval) {
        timer.fn(this.accTime/1000);
        timer.dt -= timer.interval;
      }
    })
  }
}

export {
  TimeKeeper
}