const http = require("http");

const server = http.createServer(function (req, res) {
  if (req.url === "/sampledata") {
    res.end("sample data");
  }
  res.end("hello world");
});

server.listen(3000);
