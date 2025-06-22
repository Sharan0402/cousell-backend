const express = require('express');
const courseRouter = express.Router();
const {courseModel} = require('../db');


courseRouter.post('/purchase', (req, res) => {
    res.json({
        message: "post purchase endpoint"
    })
})

courseRouter.get('/courses', (req, res) => {
    res.json({
        message: "get courses endpoint"
    })
})

module.exports = courseRouter;