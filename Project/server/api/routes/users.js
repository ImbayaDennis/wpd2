const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const router = express.Router();

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user) {
                return res.status(409).json({
                    Conflict: 'Email already in use'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            Error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username: req.body.username,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            password: hash
                        });

                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).redirect('/');
                            })
                            .catch(errs => {
                                console.log(errs);
                                res.status(500).json({
                                    Error: errs
                                });
                            });
                    }
                });
            }
        });
});

router.post('/', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    Message: 'Authentication failed'
                });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        Message: 'Authentication failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        id: user[0]._id,
                        data: user[0].data
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '3h'
                        });

                    return res.status(200).json({
                        Message: 'Authentication Successfull',
                        Token: token
                    })
                }

                return res.status(401).json({
                    Message: 'Authentication failed'
                });
            });
        })
        .catch(errs => {
            console.log(errs);
            res.status(500).json({
                Error: errs
            });
        });
});

module.exports = router;