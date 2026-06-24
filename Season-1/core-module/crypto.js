const crypto = require("crypto");

// These are only the some of the crypto methods.
// Check Node.js documentation for all crypto methods

console.log(crypto.randomBytes(10).toString());

console.log(crypto.createHash("sha256").update("hello").digest("hex"));

// crypto.createCipheriv() crypto.Decipheriv()
