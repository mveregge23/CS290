var express = require("express");

var app = express();
var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});

var answers = require("./challengeAnswers");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));

app.get(["/", "/index"], function (req, res) {
  res.render("index", {
    title: "Cinnabar Island Gym",
    styles: ["index.css", "shared.css"],
    scripts: ["linkStyles.js", "carousel.js"],
  });
});

app.get("/challenge", function (req, res) {
  res.render("challenge", {
    title: "Challenge Blaine",
    styles: ["challenge.css", "shared.css"],
    scripts: ["linkStyles.js", "submitChallenge.js"],
  });
});

app.post("/challenge", function (req, res) {
  var passed = true;
  var keys = Object.keys(answers);
  for (var key = 0; key < keys.length; key++) {
    if (answers[keys[key]] !== req.body[keys[key]]) {
      passed = false;
      break;
    }
  }
  res.send({ passed: passed });
});
app.get("/about", function (req, res) {
  res.render("about", {
    title: "About",
    styles: ["about.css", "shared.css"],
    scripts: ["linkStyles.js"],
  });
});

app.get("/resources", function (req, res) {
  res.render("resources", {
    title: "Resources",
    styles: ["resources.css", "shared.css"],
    scripts: ["linkStyles.js"],
  });
});

app.use(function (req, res) {
  res.status(404);
  res.render("404");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
