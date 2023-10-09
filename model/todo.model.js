const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    taskName: String,
    status: Boolean,
    tag: String,
    authorId: String,
})

const TodoModel = mongoose.model('todo',todoSchema)

module.exports = TodoModel