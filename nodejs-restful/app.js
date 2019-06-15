
const EventEmitter = require('events')
const emitter = new EventEmitter()

// Register a listener
emitter.on('messageLogged', function() {
    console.log('Listener called')
})

// emit : Making a noise, produce - signalling
// Raise an event
emitter.emit('messageLogged')