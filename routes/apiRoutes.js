const db = require('../db/db.json');
const router = require('express').Router();
const uniqid = require('uniqid');
const fs = require("fs")
const path = require('path');
const { raw } = require('express');

//bonus consider errors
const DB_PATH = path.join(__dirname, '..', 'db', 'db.json');

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

  //delete notes

router.delete('/notes/:id', (req, res) => {
	const idToDelete = req.params;
	console.log(idToDelete);
	let rawdata = fs.readFileSync(DB_PATH, 'utf-8');
	let notes;
	try {
	  notes = JSON.parse(rawdata) || [];
	} catch (err) {
	  console.error(err);
	  notes = [];
	}
	console.log(notes);
	let newNotes = notes.filter(sort => sort.id !== idToDelete.id);
	let output = JSON.stringify(newNotes, null, 2);
	fs.writeFileSync(DB_PATH, output)
	res.send(true);
  });
  

module.exports = router;