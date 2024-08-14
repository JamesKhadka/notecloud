const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



//ROUTE 1: Get All The Notes using: GET "/api/notes/fetchallnotes".  require login
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER ERROR SORRY FOR THE INCONVENINCE")

  }
})


//ROUTE 2: Add a new  Notes using: POST "/api/notes/addnote".  require login
router.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', ' Description must be 5 characters').isLength({ min: 5 }),

], async (req, res) => {

  try {
    const { title, description, tag } = req.body;
    //if error occurs return Bad request and errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const note = new Note({
      title, description, tag, user: req.user.id

    })
    const savedNotes = await note.save()
    res.json(savedNotes)


  } catch (error) {
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER ERROR SORRY FOR THE INCONVENINCE")

  }
})


//ROUTE 3: update an existing  Notes using: PUT "/api/notes/updatenote".  require login
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id); //checking it is same data or not by user id
    if (!note) {
      return res.status(404).send("Note Found");
    }
    //allow update only if user owns this note
    if (note.user.toString() !== req.user.id) {     //checking it is the valid user or not
      return res.status(404).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })  //if note is exist and if new note is push then it is created by  {new: true} and note is updated
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER ERROR SORRY FOR THE INCONVENINCE")
  }

})

//ROUTE 4: deleting an existing  Notes using: DELETE "/api/notes/deletenote".  require login
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    //find the note to be deleted and delete it
    let note = await Note.findById(req.params.id); //checking it is same data or not by user id
    if (!note) {
      return res.status(404).send("Note Found");
    }
    //allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {     //checking it is the valid user or not
      return res.status(404).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)  //if note is exist and if new note is push then it is deleted
    res.json({ "Successfully": "Note has been Deleted", note: note });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER ERROR SORRY FOR THE INCONVENINCE")

  }
})

module.exports = router