const { errorMonitor } = require("events");
const fs = require("fs");

// These are only the some of the crypto methods.
// Check Node.js documentation for all crypto methods

// There are many methods to do one operation(like creatinga file can be done with many methods, use the one which suit the use caase)

// Creaating new directory
// if (!fs.existsSync("./sample")) {
//   fs.mkdir("./sample", (err) => {
//     if (err) {
//       console.log("Error creating new folder", err.message);
//     } else {
//       console.log("New directory sucessfully createed");
//     }
//   });
// }

// removing the directory
// if (fs.existsSync("./sample")) {
//   fs.rmdir("./sample", (err) => {
//     if (err) console.log("Error removing directory");
//     else console.log("Directory sucessfully removed");
//   });
// }

// create and written a content to the text file
// if (!fs.existsSync("./sample/textone.txt")) {
//   fs.writeFile("./sample/textone.txt", "Content is witten", (err) => {
//     if (err) console.log("Error creaate and written a file");
//     else console.log("File sucessfully created");
//   });
// }

// Reading a data from the file
// if (fs.existsSync("./sample/textone.txt")) {
//   fs.readFile("./sample/textone.txt", (err, data) => {
//     if (err) console.log("error reading a file");
//     else {
//       // data is given a buffer , so we are converting to string
//       console.log("file data:", data.toString());
//     }
//   });
// }

// deleting a file
// if (fs.existsSync("./sample/textone.txt")) {
//   fs.unlink("./sample/textone.txt", (err) => {
//     if (err) console.log("Error deleting a file");
//     else console.log("File is deleted succesfully");
//   });
// }
