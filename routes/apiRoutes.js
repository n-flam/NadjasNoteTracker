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

//post notes
router.post('/notes', (req, res) => {

	let rawdata = fs.readFileSync(DB_PATH, 'utf-8');
	
	let notes;
	try {
	  notes = JSON.parse(rawdata) || [];
	} catch (err) {
	  console.error(err);
	  notes = [];
	}
	let newId = uniqid();
	const note = {
	  id: newId,
	  title: req.body.title,
	  text: req.body.text,
	}
	notes.push(note);
	
	let output = JSON.stringify(notes, null, 2);
	
	fs.writeFileSync(DB_PATH, output)
  
	res.send(true);
  });

module.exports = router;