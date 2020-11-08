const mongoose = require('mongoose');

const milestoneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    subject: String,
    startTime: Date,
    endTime: Date
});

module.exports = mongoose.model('Milestone', milestoneSchema);
module.exports = milestoneSchema;