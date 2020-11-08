const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Module = require('../models/module');



router.get('/:id', (req, res, next) =>{
    const proj_id = req.params.id;

    Module.findOne({
        "projects._id": proj_id
    }).exec().then(result =>{
        
        const projects = result.projects
        

         let final = projects.filter(project=>{
             const regex = new RegExp(`^${proj_id}`, 'gi');
             return project.id.match(regex);
         });
        
        console.log(final);
        res.status(200).json(final);
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });    
});

router.post('/:id', (req, res, next) =>{
    const proj_id = req.params.id;

    Module.updateOne({
        "projects._id": proj_id
    },
    {
        $push: {
        "projects.milestones": {
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            Subject: req.body.subject,
            StartTime: req.body.start,
            EndTime: req.body.end
        }
      }
    }).exec().then(result =>{
        console.log(result);
        res.status(201).json(result);
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;