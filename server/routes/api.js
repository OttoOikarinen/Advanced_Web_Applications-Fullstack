var express = require('express');
const Books = require('../models/Books');
const mongoose = require('mongoose');
var router = express.Router();

router.post('/book', async (req, res) => {
    try {
        console.log("Adding book to database.")
        let name = req.body.name;
        let author = req.body.author;
        let pages = req.body.pages;

        console.log("Name: " + name + ", author: " + author + " and pages: " + pages);

        const existingBook = await Books.findOne({name});
        if (existingBook) {
        return res.status(400).json({error: "Book already in database."});
        }

        const newBook = new Books({
            name: name,
            author: author,
            pages: pages,
        })
    
        await newBook.save();
        return res.send("ok");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;