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

router.post('/:id', (req, res, next) => {
    const id = req.params.id
    Module.update({
        _id: id
    },
        {
            $set: {
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