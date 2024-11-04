const event = require('events')
const myevent = new event();

myevent.on('hai',()=>{console.log("said hai");});

myevent.emit('hai');