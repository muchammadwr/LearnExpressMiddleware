const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

// app.use(morgan("dev"));
app.use((req, res, next) => {
  //   req.timeRequest = Date.now();
  console.log(req.method, req.url);
  next();
});

const auth = (req, res, next) => {
  const { password } = req.query;
  if (password === "tahukrispy") {
    next();
  }
  res.send("Anda tidak memiliki akses, masukkan password anda");
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/halaman", (req, res) => {
  console.log(req.timeRequest);
  res.send("Hello Halaman!");
});

app.get("/admin", auth, (req, res) => {
  res.send("Hello Admin!");
});

app.use((req, res) => {
  res.send("Page not found");
});

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
