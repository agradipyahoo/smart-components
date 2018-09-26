import { EventEmitter } from 'events';

class SimpleEmitter extends EventEmitter {
  constructor(props) {
    super(props);
  }

  off(event, handler) {
    this.removeListener(event, handler);
  }

  on(event, callback) {
    super.on(event, callback);
    let self = this;
    return function() {
      self.removeListener(event, callback);
    };
  }

  trigger() {
    this.emit.apply(this, arguments);
  }
}

export default SimpleEmitter;
