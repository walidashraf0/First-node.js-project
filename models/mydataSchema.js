const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Build Schema 
const mydataSchema = new Schema({
    userName: String,
});
// Build Model
const MyData = mongoose.model("MyData", mydataSchema);
module.exports = MyData;