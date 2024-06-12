const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const notesController = require('express').Router();

notesController.get('/notes', (req, res) => {
    try {
        fs.readFile('./db/db.json', 'utf8', (error, data) => {
            console.log(data);
            if (error) {
                console.log(error);
            }
            res.json(JSON.parse(data));
        })
    } catch (error) {
        res.json({error});
    }
})

notesController.post('/notes', (req, res) => {
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuidv4(),
    }

    fs.writeFile('./db/db.json', JSON.stringify(newNote), (err) =>
        err ? res.json({err}) : res.json({ message: `\nData written to database`})
    );
   }
)


module.exports = notesController
