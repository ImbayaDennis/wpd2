const mongoose = require('mongoose');
const milestoneSchema = require('./timeline');


const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    desc: String,
    start: Date,
    end: Date,
    milestones:[milestoneSchema]
});

module.exports = mongoose.model('Project', projectSchema);
module.exports = projectSchema;