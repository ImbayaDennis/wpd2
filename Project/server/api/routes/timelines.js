const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        "message": "Timeline GET requests endpoint response"
    });
});

router.post('/', (req, res, next) =>{
    res.status(201).json({
        "message": "Timeline POST requests endpoint response"
    });
});

router.delete('/', (req, res, next) =>{
    res.status(200).json({
        "message": "Timeline DELETE requests endpoint response"
    })
});

router.get('/:id', (req, res, next) =>{
    res.status(200).json({
        "message": "Timeline GET requests endpoint response",
        "idNo": req.params.id
    });
});

router.post('/:id', (req, res, next) =>{
    res.status(201).json({
        "message": "Timeline POST requests endpoint response",
        "idNo": req.params.id
    });
});

router.delete('/:id', (req, res, next) =>{
    res.status(200).json({
        "message": "Timeline DELETE requests endpoint response",
        "idNo": req.params.id
    })
});

module.exports = router;