const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const MyData = require("./models/mydataSchema");
// Routing
app.get("/", (req, res) => {
  MyData.find()
    .then((result) => {
      res.render("home", {
        myTitle: "Home Page",
        arr: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/index.html", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

mongoose
  .connect(
    "mongodb+srv://walidashraf050:UCNCUQIhZmJygbWI@cluster0.chxe8xl.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
  console.log(req.body);
  const myData = new MyData(req.body);
  myData
    .save()
    .then(() => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.log(err);
    });
});
