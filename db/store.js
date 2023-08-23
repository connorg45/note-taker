const util = require('util');
const fs = require('fs').promises; 

const uuidv1 = require('uuid/v1');

class Store {
  async read() {
    try {
      // Read the contents of the 'db/db.json' file
      return await fs.readFile('db/db.json', 'utf8');
    } catch (err) {
      return '';
    }
  }

  // Write data to the 'db/db.json' file
  async write(note) {
    await fs.writeFile('db/db.json', JSON.stringify(note));
  }

  // Get all notes from the database
  async getNotes() {
    try {
      const notes = await this.read();
      return JSON.parse(notes) || [];
    } catch (err) {
      return [];
    }
  }

  // Add a new note to the database
  async addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    const newNote = { title, text, id: uuidv1() };
    const notes = await this.getNotes();
    notes.push(newNote);
    await this.write(notes);

    return newNote;
  }

  // Remove a note from the database based on its ID
  async removeNote(id) {
    const notes = await this.getNotes();
    const filteredNotes = notes.filter((note) => note.id !== id);
    await this.write(filteredNotes);
  }
}

module.exports = new Store();