const apiRouter = require('express').Router();
const { Router } = require('express');
const helpers = require('../helpers/fsUtils.js');

apiRouter.get('/notes', (req, res) => {
    store
        .getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => res.status(500).json(err));
});

apiRouter.post('/notes', (req, res) => {
    store
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

apiRouter.delete('/notes/:id', (req, res) => {
    store
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true}))
        .catch((err) => res.status(500).json(err));
});

module.exports = apiRouter;