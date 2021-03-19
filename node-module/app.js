

// Start Http Module
/*const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Server running....");
        res.end();
    }

    if (req.url === "/api/courses") {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});*/

//Socket
/*server.on("connection", socket => {
    console.log("New connection.....");
});*/

/*server.listen(3000);

console.log("Listening on port 3000.....");*/
// End ======= Http Module

// Start Extended EventEmitter
/*const Logger = require("./logger");
const logger = new Logger();*/

// Resister a listener
/*logger.on("messageLogged", (arg) => {
    console.log("Listener Called", arg);
});

logger.log("message");*/

// Event Arguments
/*
const EventEmitter = require("events");
const emitter = new EventEmitter();

// Resister a listener
emitter.on("messageLogged", (arg) => {
   console.log("Listener Called", arg);
});

// Raise an event
emitter.emit("messageLogged", {id: 10, url: 'http://binarysyntax.com'});*/
