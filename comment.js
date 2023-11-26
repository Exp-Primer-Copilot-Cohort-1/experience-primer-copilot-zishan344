//create web server
//express module
const express = require("express");
const router = express.Router();

//comment model
const Comment = require("../models/comment");

//comment route
router.get("/", (req, res) => {
  res.render("comment");
});

//post route
router.post("/", (req, res) => {
  const comment = new Comment(req.body);
  comment
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

//export module
module.exports = router;
