const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { response } = require('../../app');

const Module = require('../models/module');

router.get('/', (req, res, next) => {
    Module.find()
        .exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', async (req, res, next) => {
    // console.log("Posted");
    // res.status(200).json({message: "Success"})

    const module = new Module({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.title,
        facilitator: req.body.description,
        start: req.body.start_date,
        end: req.body.end_date
    });
    module.save().then((result) => {
        console.log(result);
        res.status(201).redirect('/dashboard/modules');
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        "message": "Modules DELETE requests endpoint response"
    })
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Module.findById(id).exec().then((result) => {
        console.log(result)
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }

    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:mod_id/:proj_id', (req, res, next) => {
    const id = req.params.proj_id;

    Module.find({ 'projects._id': id }).exec().then((result) => {
        console.log(result)
        if (result) {
            const matches = (result[0].projects).filter(match => {
                const regex = new RegExp(`${id}`, 'gi')
                return match.id.match(regex);
            });

            const milestones = matches[0]['milestones']

            res.status(200).json(milestones);
        } else {
            res.status(404).json({
                message: "No record found for specified ID"
            });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.post('/:mod_id/:proj_id', (req, res, next) => {
    const id = req.params.proj_id
    Module.update({
        _id: id
    },
        {
            $push: {
                milestones: {
                    Id: mongoose.Types.ObjectId(),
                    Subject: req.body.Subject,
                    Location: req.body.Location,
                    StartTime: req.body.StartTime,
                    EndTime: req.body.EndTime,
                    Description: req.body.Description,
                    Owner: req.body.Owner,
                    Priority: req.body.Priority,
                    Recurrence: req.body.Recurrence,
                    RecurrenceType: req.body.RecurrenceType,
                    RecurrenceTypeCount: req.body.RecurrenceTypeCount,
                    Reminder: req.body.Reminder,
                    Categorize: req.body.Categorize,
                    CustomStyle: req.body.CustomStyle,
                    AllDay: req.body.AllDay,
                    RecurrenceStartDate: req.body.RecurrenceStartDate,
                    RecurrenceEndDate: req.body.RecurrenceEndDate,
                    RecurrenceRule: req.body.RecurrenceRule,
                    StartTimeZone: req.body.StartTimeZone,
                    EndTimeZone: req.body.EndTimeZone
                }
            }
        }).then(result => {
            console.log(result);
            res.status(201).redirect(`/dashboard/modules/${id}`);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.post('/:id', (req, res, next) => {
    const id = req.params.id
    Module.update({
        _id: id
    },
        {
            $push: {
                projects: {
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.title,
                    desc: req.body.description,
                    start: req.body.start_date,
                    end: req.body.end_date
                }
            }
        }).then(result => {
            console.log(result);
            res.status(201).redirect(`/dashboard/modules/${id}`);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        "message": "Modules DELETE requests endpoint response",
        "idNo": req.params.id
    })
});

module.exports = router;