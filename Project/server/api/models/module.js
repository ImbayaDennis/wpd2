const mongoose = require('mongoose');

const milestoneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    desc: String,
    startTime: Date,
    endTime: Date
});

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    desc: String,
    start: Date,
    end: Date,
    milestones:[milestoneSchema]
});

const moduleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    desc: String,
    start: Date,
    end: Date,
    projects: [projectSchema]
});

module.exports = mongoose.model('Module', moduleSchema);