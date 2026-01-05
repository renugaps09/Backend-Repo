const express = require("express");
const app = express();

 app.get("/", (req, res) => {
  res.send("Node.js server running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5+000");
});