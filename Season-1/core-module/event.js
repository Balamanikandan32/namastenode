const event = require("events");

const myemitter = new event();

// These are only the some of the event methods.
// Check Node.js documentation for all event methods

myemitter.on("sample", (a, b) => {
  console.log("saamplem event listening:", a, b);
});

myemitter.emit("sample", "arg1", "arg2");
