const db = require('../db/db.json');
const router = require('express').Router();
const uniqid = require('uniqid');
const fs = require("fs")
const path = require('path');
const { raw } = require('express');

//get notes
router.get('/notes', (req, res) => {
  let rawdata = fs.readFileSync(DB_PATH, 'utf-8');
  let db = JSON.parse(rawdata)
  res.json(db);
  }
);


module.exports = router;