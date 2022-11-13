const util = require('util');
const fs = require('fs');
const uniqid = require('uniqid');

const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

class Save {
    read() {
        return readFromFile('../db/db.json', 'utf8');
    }

    write(note) {
        return writeToFile('../db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
        
            return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Must enter a note title and note text!");
        }
        
        const newNote = { title, text, id: uniqid() };

        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }

    removeNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Save();