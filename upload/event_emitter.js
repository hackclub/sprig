export class EventEmitter {
  /*
   * ## Design Goals:
   *
   * - Replicate the Node EventEmitter API as close as possible, but excluding any
   *   deprecated parts.
   * - Allow classes to either extend this class or use it as a mixin.
   *
   * ## Implementation Notes:
   *
   * - A constructor that sets up the necessary instance variables is not used since
   *   this is intended to be used as a mixin.  As a consequence, the instance
   *   variables are checked for existence in each method that requires them.
   * - The same instance variables used by Node are also used.
   */

  /**
   * Synchronously calls each of the listeners registered for the event named
   * `eventName`, in the order they were registered, passing the supplied arguments
   * to each.
   *
   * @param {string} eventName - The name of the event.
   * @param {mixed} [...] - The arguments to pass to each listener.
   *
   * @return {boolean} `true` if the event had listeners, `false` otherwise.
   */
  emit(eventName) {
    this._events = this._events || {};
    var args, i, iLen, listener, listeners;

    args = Array.prototype.slice.call(arguments, 1);
    listeners = this._events[eventName];

    if (listeners) {
      // Create a copy since the 'once' listeners will modify the original array as we loop.
      listeners = listeners.slice();
      for (i = 0, iLen = listeners.length; i < iLen; ++i) {
        listener = listeners[i]
        listener.apply(this, args);
      }
      return true;
    }

    return false;
  }

  /**
   * @return {Array<string>} The set of event names 'registered' with this event
   *   emitter.  The names are in no particular order.  Always returns an array --
   *   never `null`.
   */
  eventNames() {
    // Note: Expects that a key (aka event name) does not exist that is associated with en empty array.
    return Object.keys(this._events = this._events || {});
  }

  /**
   * @return {number} The current max listener value for the event emitter which is
   *   either set by `emitter.setMaxListeners(n)` or defaults to
   *   `EventEmitter.defaultMaxListeners`.
   */
  getMaxListeners() {
    return (typeof this._maxListeners == 'number' ? this._maxListeners : EventEmitter.defaultMaxListeners);
  }

  /**
   * @return {boolean} `true` if the event has listeners, `false` otherwise.
   */
  hasListeners(eventName) {
    this._events = this._events || {};
    return (this._events[eventName] || []).length > 0;
  }

  /**
   * @param {string} eventName - The name of the event.
   *
   * @return {number} The number of listeners listening to the event named
   *   `eventName`.
   */
  listenerCount(eventName) {
    this._events = this._events || {};
    return (this._events[eventName] || []).length;
  }

  /**
   * @param {string} eventName - The name of the event.
   *
   * @return {Function[]} A copy of the array of listeners for the event named
   *   `eventName`.
   */
  listeners(eventName) {
    this._events = this._events || {};
    return Array.prototype.slice.call(this._events[eventName] || []);
  }

  /**
   * Removes listeners from the listener array.
   *
   * If both `eventName` and `listener` are specified, then behaves the same as
   * calling `removeListener`.
   * 
   * If only `eventName` is specified, then all listeners associated with the event
   * are removed.
   *
   * If no arguments are specified, then all listeners are removed.
   *
   * A `removeListener` event is emitted for each listener removed.
   *
   * @param {string} [eventName] - The name of the event.
   * @param {Function} [listener] - The callback function.
   */
  off(eventName, listener) {
    var argLen = arguments.length;

    if (argLen === 0 || argLen === 1) {
      return this.removeAllListeners.apply(this, arguments);
    }
    else if (argLen === 2) {
      return this.removeListener.apply(this, arguments);
    }

    return this;
  }

  /**
   * Adds the listener function to the end of the listeners array for the event
   * named `eventName`.  No checks are made to see if the listener has already been
   * added.  Multiple calls passing the same combination of `eventName` and
   * listener will result in the listener being added, and called, multiple times.
   *
   * A `newListener` event is emitted for the added listener.
   *
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The callback function.
   *
   * @return {EventEmitter} A reference to this event emitter, so that calls can be
   *   chained.
   */
  on(eventName, listener) {
    EventEmitter._.append(this, eventName, listener);
    return this;
  }

  /**
   * Adds a one time listener function for the event named `eventName`.  The next
   * time `eventName` is emitted, this listener is removed and then invoked.
   *
   * A `newListener` event is emitted for the added listener.
   *
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The callback function.
   *
   * @return {EventEmitter} A reference to this event emitter, so that calls can be
   *   chained.
   */
  once(eventName, listener) {
    function justOnce() {
      this.off(eventName, justOnce);
      listener.apply(this, arguments);
    }

    justOnce.fn = listener;
    EventEmitter._.append(this, eventName, justOnce, listener);
    return this;
  }

  /**
   * Adds the listener function to the beginning of the listeners array for the
   * event named `eventName`.  No checks are made to see if the listener has
   * already been added.  Multiple calls passing the same combination of
   * `eventName` and `listener` will result in the listener being added, and
   * called, multiple times.
   *
   * A `newListener` event is emitted for the added listener.
   *
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The callback function.
   *
   * @return {EventEmitter} a reference to this event emitter, so that calls can be
   *   chained.
   */
  prependListener(eventName, listener) {
    EventEmitter._.prepend(this, eventName, listener);
    return this;
  }

  /**
   * Adds a one time listener function for the event named `eventName` to the
   * beginning of the listeners array.  The next time `eventName` is emitted, this
   * listener is removed, and then invoked.
   *
   * A `newListener` event is emitted for the added listener.
   *
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The callback function.
   *
   * @return {EventEmitter} A reference to this event emitter, so that calls can be
   *   chained.
   */
  prependOnceListener(eventName, listener) {
    function justOnce() {
      this.off(eventName, justOnce);
      listener.apply(this, arguments);
    }

    justOnce.fn = listener;
    EventEmitter._.prepend(this, eventName, justOnce, listener);
    return this;
  }

  /**
   * Removes the specified listener from the listener array for the event named
   * `eventName`.
   *
   * `removeListener` will remove, at most, one instance of a listener from the
   * listener array.  If any single listener has been added multiple times to the
   * listener array for the specified eventName, then `removeListener` must be
   * called multiple times to remove each instance.
   *
   * Note that once an event has been emitted, all listeners attached to it at the
   * time of emitting will be called in order.  This implies that any
   * `removeListener()` or `removeAllListeners()` calls after emitting and before
   * the last listener finishes execution will not remove them from `emit()` in
   * progress.  Subsequent events will behave as expected.
   *
   * Because listeners are managed using an internal array, calling this will
   * change the position indices of any listener registered after the listener
   * being removed.  This will not impact the order in which listeners are called,
   * but it means that any copies of the listener array as returned by the
   * `emitter.listeners()` method will need to be recreated.
   *
   * A `removeListener` event is emitted for each listener removed.
   *
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The callback function.
   *
   * @return {EventEmitter} A reference to this event emitter, so that calls can be
   *   chained.
   */
  removeListener(eventName, listener) {
    this._events = this._events || {};
    var event, events, i, iLen;

    events = this._events[eventName];
    if (!events) return this;

    // Remove specific listener:
    for (i = 0; i < events.length; ++i) {
      event = events[i];
      if (event === listener || event.fn === listener) {
        events.splice(i, 1); // Delete
        this.emit('removeListener', eventName, listener);
        break;
      }
    }
    // The following allows the current implementation of `eventNames` to work correctly.
    if (events.length === 0) {
      delete this._events[eventName];
    }
    return this;
  }

  /**
   * Removes all listeners, or those of the specified `eventName`.
   * 
   * Note that it is bad practice to remove listeners added elsewhere in the code,
   * particularly when the `EventEmitter` instance was created by some other
   * component or module (e.g. sockets or file streams).
   *
   * A `removeListener` event is emitted for each listener removed.
   *
   * @param {string} eventName - The name of the event.
   *
   * @return {EventEmitter} A reference to this event emitter, so that calls can be
   *   chained.
   */
  removeAllListeners(eventName) {
    this._events = this._events || {};
    var events, i, iLen, listener;

    // Remove all listeners:
    if (arguments.length === 0) {
      for (eventName in this._events) {
        if (eventName != 'removeListener') {
          events = this._events[eventName];
          for (i = 0, iLen = events.length; i < iLen; ++i) {
            listener = events[i];
            this.emit('removeListener', eventName, listener);
          }
          delete this._events[eventName];
        }
      }
      delete this._events['removeListener'];
      this._events = {};
    }
    // Remove all listeners for specified event:
    else if (arguments.length === 1) {
      events = this._events[eventName];
      if (events) {
        for (i = 0, iLen = events.length; i < iLen; ++i) {
          listener = events[i];
          this.emit('removeListener', eventName, listener);
        }
      }
      delete this._events[eventName];
    }

    return this;
  }

  /**
   * By default `EventEmitters` will print a warning if more than 10 listeners are
   * added for a particular event.  This is a useful default that helps finding
   * memory leaks.  Obviously, not all events should be limited to just 10
   * listeners. The `emitter.setMaxListeners()` method allows the limit to be
   * modified for this specific event emitter instance.  The value can be set to
   * `Infinity` (or `0`) to indicate an unlimited number of listeners.
   *
   * @param {number} n - The number of listeners allowed before a warning is
   *   issued.
   *
   * @return {EventEmitter} A reference to this event emitter, so that calls can be
   *   chained.
   */
  setMaxListeners(n) {
    if (typeof n != 'number' || Number.isNaN(n) || n < 0) {
      throw new TypeError('n must be a positive number');
    }
    this._maxListeners = n;
    return this;
  }
}

/**
 * By default, a maximum of 10 listeners can be registered for any single event.
 * This limit can be changed for individual `EventEmitter` instances using the
 * `emitter.setMaxListeners(n)` method.  To change the default for all
 * `EventEmitter` instances, the `EventEmitter.defaultMaxListeners` property can
 * be used.
 *
 * Take caution when setting the `EventEmitter.defaultMaxListeners` because the
 * change affects all `EventEmitter` instances, including those created before
 * the change is made.  However, calling `emitter.setMaxListeners(n)` still has
 * precedence over `EventEmitter.defaultMaxListeners`.
 */
EventEmitter.defaultMaxListeners = 10;

EventEmitter._ = {
  checkMaxListeners: function (emitter, eventName) {
    var len = emitter._events[eventName].length;
    if (len > emitter.getMaxListeners()) {
      console.warn('possible EventEmitter memory leak detected. %d %s listeners added. Use emitter.setMaxListeners() to increase limit.', len, eventName);
    }
  },
  append: function (emitter, eventName, listener, origListener) {
    emitter._events = emitter._events || {};
    emitter.emit('newListener', eventName, origListener || listener);
    (emitter._events[eventName] = emitter._events[eventName] || []).push(listener);
    this.checkMaxListeners(emitter, eventName);
  },
  prepend: function (emitter, eventName, listener, origListener) {
    emitter._events = emitter._events || {};
    emitter.emit('newListener', eventName, origListener || listener);
    (emitter._events[eventName] = emitter._events[eventName] || []).splice(0, 0, listener);
    this.checkMaxListeners(emitter, eventName);
  }
};

// Conform to Ext-JS's Ext.mixin.Observable
// EventEmitter.prototype.fireEvent = 
// Conform to jQuery's .trigger
EventEmitter.prototype.trigger = EventEmitter.prototype.emit;

// Conform to Node's EventEmitter
/**
 * Alias for `emitter.on(eventName, listener)`.
 */
EventEmitter.prototype.addListener = 
// Conform to DOM's EventTarget
EventEmitter.prototype.addEventListener = EventEmitter.prototype.on;

// Conform to DOM's EventTarget
EventEmitter.prototype.removeEventListener = EventEmitter.prototype.removeListener;
