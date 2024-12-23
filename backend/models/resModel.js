const mongoose = require("mongoose");
let resSchema = mongoose.Schema({
    Title: String,
    Solutions: String,
});

const resource = mongoose.model("Resource", resSchema);

module.exports = resource;