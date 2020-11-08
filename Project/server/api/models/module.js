const mongoose = require('mongoose');
const projectSchema = require('./project');


const moduleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    facilitator: String,
    start: Date,
    end: Date,
    projects: [projectSchema]
});

module.exports = mongoose.model('Module', moduleSchema);