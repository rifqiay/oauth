require("dotenv").config();
const express = require("express");
const port = process.env.PORT;
const app = express();
const passport = require("passport");
const session = require("express-session");
const auth = require("./auth");
let userProfile;

auth(passport, userProfile);

app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.get("/", (req, res) => {
  res.render("pages/auth");
});

app.get("/success", (req, res) => {
  res.render("pages/success");
});

app.get("/error", (req, res) => res.send("error login"));

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/error",
  }),
  (req, res) => {
    res.redirect("/success");
  }
);

app.listen(port, () => {
  console.log(`server runing on port ${port}`);
});
