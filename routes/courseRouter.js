const express = require('express');
const router = express.Router();

router.post('/purchase', (req, res) => {
    res.json({
        message: "post purchase endpoint"
    })
})

router.get('/courses', (req, res) => {
    res.json({
        message: "get courses endpoint"
    })
})

module.exports = router;