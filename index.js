const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
var moment = require("moment");
app.set("view engine", "ejs");
const User = require("./models/customerSchema");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

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
        moment: moment,
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

app.get("/user/add.html", (req, res) => {
  res.render("user/add", { root: __dirname });
});

// GET Request
app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", {
        user: result,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/search.html", (req, res) => {
  res.render("user/search", { root: __dirname });
});

app.get("/view/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", {
        user: result,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // res.render("user/view", { root: __dirname });
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

// DELETE REQUSEST
app.delete("/edit/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.redirect("/");
      console.log(result)
    })
    .catch((err) => {
      console.log(err);
    });
});

// Another Way For DELETE REQUEST With deleteOne({Keyy: Value})
// app.delete("/edit/:id", (req, res) => {
//   User.deleteOne({ _id: req.params.id })
//     .then((result) => {
//       res.redirect("/");
//       console.log(result)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
