const apiRouter = require('express').Router();
const { Router } = require('express');
const fsUtils = require('../helpers/fsUtils.js');
const uuid = require('../helpers/uuid');

apiRouter.get('/notes', (req, res) => {
    fsUtils.readFromFile('./db/db.json')
        .then(notes => {
            res.json(JSON.parse(notes))
        })
})

apiRouter.post('/notes', (req, res) => {
    let newNote = {
        title:req.body.title,
        text:req.body.text,
        id:uuid()
    }
    fsUtils.readAndAppend(newNote, './db/db.json')
    const response = {
        status:'success', body:newNote
    }
    res.json(response)
})

apiRouter.delete('/notes/:id', (req, res) => {
    fsUtils
        .removeNote(req.params.id, './db/db.json')
        const response = {
            status:'success'
        }
        res.json(response)
});

module.exports = apiRouter;