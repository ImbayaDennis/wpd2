const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.json([
        {
            id: 1, username: "Dennis"
        }
    ]);
});

module.exports = router;