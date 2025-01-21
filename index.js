const exp = require("constants");
const express = require("express");
const { resolve } = require("path");
const student = require("./data.json");

const app = express();
const port = 3010;

app.use(express.json());
app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

app.post("/students/above-threshold", (req, res) => {
  const { threshold } = req.body;
  if (threshold < 0) {
    res.send("Negative Scores are not allowed");
  }
  const filtered = student.filter((x) => {
    return x.total > threshold;
  });
  res.json({
    count: filtered.length,
    students: filtered.map((x) => ({ name: x.name, total: x.total })),
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
