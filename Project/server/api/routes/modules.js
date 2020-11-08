const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { response } = require('../../app');

const Module = require('../models/module');

router.get('/', (req, res, next) =>{
    Module.find().exec().then((result) =>{
        res.status(200).json(result)
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    });    
});

router.post('/', async (req, res, next) =>{
    
    const module = new Module({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.title,
        facilitator: req.body.description,
        start: req.body.start_date,
        end: req.body.end_date
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
    module.save().then((result) =>{
        console.log(result);
        res.status(201).json(result);
    }).catch((err) =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/', (req, res, next) =>{
    res.status(200).json({
        "message": "Modules DELETE requests endpoint response"
    })
});

router.get('/:id', (req, res, next) =>{
    const id = req.params.id;
    Module.findById(id).exec().then((result) =>{
        console.log(result)
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "No record found for specified ID"
            });
        }
        
    }).catch((err) =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });    
});

router.post('/:id', (req, res, next) =>{
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
    }).then(result =>{
        console.log(result);
        res.status(201).json(result);
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:id', (req, res, next) =>{
    res.status(200).json({
        "message": "Modules DELETE requests endpoint response",
        "idNo": req.params.id
    })
});

module.exports = router;