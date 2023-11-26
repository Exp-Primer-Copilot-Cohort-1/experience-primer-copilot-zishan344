//create web server
const express = require("express");
//create web server
const router = express.Router();
//import database
const db = require("../db");
//import shortid
const shortid = require("shortid");
//import lowdb
const low = require("lowdb");
//import FileSync
const FileSync = require("lowdb/adapters/FileSync");
//create adapter
const adapter = new FileSync("db.json");
//create database
const database = low(adapter);

//set default value for database
database.defaults({ comments: [] }).write();

//get all comments
router.get("/", (req, res) => {
  res.render("comments/index", {
    comments: database.get("comments").value(),
  });
});

//get form add comments
router.get("/add", (req, res) => {
  res.render("comments/add");
});

//add comment
router.post("/add", (req, res) => {
  //add id for comment
  req.body.id = shortid.generate();
  //add comment to database
  database.get("comments").push(req.body).write();
  //redirect to comments page
  res.redirect("/comments");
});

//get comment by id
router.get("/:id", (req, res) => {
  let id = req.params.id;
  let comment = database.get("comments").find({ id: id }).value();
  res.render("comments/view", { comment: comment });
});

//delete comment by id
router.get("/:id/delete", (req, res) => {
  let id = req.params.id;
  database.get("comments").remove({ id: id }).write();
  res.redirect("/comments");
});

module.exports = router;
