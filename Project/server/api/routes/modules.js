const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { response } = require('../../app');

const Module = require('../models/module');
const User = require('../models/user');
const checkAuth = require('../Auth/check-auth');


//All /modules GET requests

router.get('/', checkAuth, (req, res, next) => {

    User.findOne({
        _id: req.userData.id
    })
        .populate('data.modules')
        .then(resp => {
            const mods = resp.data.modules;

            res.status(200).json(mods);
        })
        .catch(err => {
            res.status(500).json({
                Error: err
            });
        });


});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Module.findById(id).exec().then((result) => {
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

//All /modules POST requests

router.post('/', checkAuth, async (req, res, next) => {
    // console.log("Posted");
    // res.status(200).json({message: "Success"})
    const new_id = new mongoose.Types.ObjectId();

    const module = new Module({
        _id: new_id,
        name: req.body.name,
        desc: req.body.desc,
        start: req.body.start,
        end: req.body.end
    });

    User.findOneAndUpdate({
        _id: req.userData.id
    },
        {
            $push: {
                "data.modules": new_id
            }
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.this.status(500).json({
                Error: err
            });
        });

    module
        .save()
        .then(() => {
            res.status(201).redirect('/dashboard/modules');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id
    Module.update({
        _id: id
    },
        {
            $push: {
                projects: {
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    desc: req.body.desc,
                    start: req.body.start,
                    end: req.body.end
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

router.post('/:mod_id/:proj_id', checkAuth, (req, res, next) => {
    const mod_id = req.params.proj_id
    const proj_id = req.params.proj_id
    Module.update({ "projects._id": proj_id },
        {
            $push: {
                'projects.$.milestones': {
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    desc: req.body.desc,
                    start: req.body.start,
                    end: req.body.end
                }
            }
        })
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id

    Module.findByIdAndDelete(id)
        .then(result => {
            res.status(200);
        })
        .catch(err => {
            res.status(500).json({
                Error: err
            });
        });
});

router.delete('/:mod_id/:proj_id', checkAuth, (req, res, next) => {
    const mod_id = req.params.mod_id;
    const proj_id = req.params.proj_id;

    Module.update({
        _id: mod_id
    },
        {
            $pull: {
                "projects": { _id: proj_id }
            }
        })
        .then(result => {
            res.status(200);
        })
        .catch(err => {
            res.status(500).json({
                Error: err
            });
        });
});

router.delete('/:mod_id/:proj_id/:mile_id', checkAuth, (req, res, next) => {
    const mile_id = req.params.mile_id;

    Module.update({
        "projects.milestones._id": mile_id
    },
        {
            $pull: { "projects.$.milestones": { _id: mile_id } }
        })
        .then(result => {
            res.status(200);
        })
        .catch(err => {
            res.status(500).json({
                Error: err
            });
        });
});

router.put('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;

    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Module.updateOne({ _id: id }, { $set: updateOps })
        .then(response => {
            console.log(response)
            res.status(200)
        }).catch(err => {
            res.status(500).json({
                Error: err
            });
        });
});

router.put('/:mod_id/:proj_id', checkAuth, (req, res, next) => {
    const proj_id = req.params.proj_id;

    const updateOps = {};

    for (const ops of req.body) {
        updateOps[("projects.$." + ops.propName)] = ops.value;
    }

    console.log(updateOps)
    Module.findOneAndUpdate({ "projects._id": proj_id }, { $set: { updateOps } })
        .then(response => {
            console.log(response)
            res.status(200)
        }).catch(err => {
            res.status(500).json({
                Error: err
            });
        });
});

router.put('/:mod_id/:proj_id/:mile_id', checkAuth, (req, res, next) => {
    const mile_id = req.params.mile_id;

    const updateOps = {};

    for (const ops of req.body) {
        updateOps[("projects.$.milestones.$." + ops.propName)] = ops.value;
    }

    console.log(updateOps)
    Module.updateOne({ "projects.milestones._id": mile_id }, { $set: { updateOps } })
        .then(response => {
            console.log(response)
            res.status(200)
        }).catch(err => {
            res.status(500).json({
                Error: err
            });
        });
});

module.exports = router;