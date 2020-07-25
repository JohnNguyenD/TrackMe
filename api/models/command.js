const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CommandSchema = new Schema({
    body: String
})

const Command = mongoose.model("send-command", CommandSchema);
module.exports = Command;