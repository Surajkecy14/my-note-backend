// routes/note.js
const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const Note = require("../module/Note");
const User = require("../module/User");
const router = express.Router();

router.post("/addNote", isLoggedIn, async (req, res) => {
  const { title, description } = req.body;
  const user = await User.findOne({ email: req.user });
 await Note.create({
    user: user._id,
    title,
    description,
  });
  res.send("DONE!!!!");
});

router.get('/getNote',isLoggedIn,async(req,res)=>{
    const user = await User.findOne({ email: req.user });
    const note = await Note.find({user: user._id})
    res.json(note);
});
// to delete note
router.delete('/deleteNote/:id', isLoggedIn, async (req, res) => {
  try {
    const noteId = req.params.id;
    await Note.findOneAndDelete({ _id: noteId });
    res.json({ success: true, message: "Note deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error deleting note." });
  }
});


//to update or edit note
router.put('/noteEdit/:id',isLoggedIn,async(req,res)=>{
  try {
    const noteId = req.params.id;
    const {title,description}= req.body
    const updatedNote =await Note.findOneAndUpdate({_id: noteId},{title,description},{new:true})
     res.json(updatedNote);
  } catch (error) {
    console.error(error)
  }
})


module.exports = router; // <<--- VERY IMPORTANT
