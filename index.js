const express = require("express");
const bodyParser = require("body-parser");
//test
let PORT = process.env.port || 3000;
let server = express();
const middlewares = [
  express.static("dist"),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true })
];

server.use(middlewares);

server.get("/", (_, res) => {
  return res.send(`<!DOCTYPE html>
  <style>
  html,body{ width: 98vw; height: 96vh; font-family: Verdana, sans-serif;  }
  #root{ height: 100%; }
  .react-datepicker-wrapper {
    position: relative !important;
    bottom: 9px !important;
  }
  #date.error {
    border-bottom:  1px solid red !important;
  }
  #date {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: none;
    border-bottom: 1px black solid !important;
  }
  .error {  }
  </style>
  <html>
    <head></head>
    <body>
    <div id="root" />
      <script src="/bundle.js"></script>
    </body>
  </html>
`);
});

server.listen(PORT, function () {
  console.log(`server listening on port: ${PORT}`);
});
