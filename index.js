const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
const User = require("./models/customerSchema");

// Auto Refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Routing
app.get("/", (req, res) => {
  User.find()
    .then((result) => {
      res.render("index", {
        myTitle: "Home Page",
        users: result,
      });
    })
    .catch((err) => {
      console.error("Error fetching users from MongoDB:", err);
      res.render("index", {
        myTitle: "Home Page",
        users: [],
      });
    });
});

app.get("/user/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", {
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // res.render("user/view", { root: __dirname });
});

// GET Request
app.get("/user/add.html", (req, res) => {
  res.render("user/add", { root: __dirname });
});
app.get("/user/edit.html", (req, res) => {
  res.render("user/edit", { root: __dirname });
});
app.get("/user/view.html", (req, res) => {
  res.render("user/view", { root: __dirname });
});
app.get("/user/search.html", (req, res) => {
  res.render("user/search", { root: __dirname });
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

// POST Request
app.post("/user/add.html", (req, res) => {
  console.log(req.body);
  const myData = new User(req.body);
  myData
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get("/index.html", (req, res) => {
//   res.sendFile("./views/index.html", { root: __dirname });
// });
