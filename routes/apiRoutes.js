const router = require('express').Router();
const store = require('../db/store');

// GET route to retrieve all notes from the database
router.get('/notes', async (req, res) => {
  try {
    const notes = await store.getNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to add a new note to the database
router.post('/notes', async (req, res) => {
  try {
    const note = await store.addNote(req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to remove a note from the database based on its ID
router.delete('/notes/:id', async (req, res) => {
  const idToDelete = req.params.id; 
  try {
    await store.removeNote(idToDelete);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;