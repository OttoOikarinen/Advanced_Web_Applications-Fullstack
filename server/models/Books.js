const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let booksSchema = new Schema({
    name: {type: String, index: true, required: true},
    author: {type: String, required: true},
    pages: {type: Number, required: true}
})


module.exports = mongoose.model("Books", booksSchema);