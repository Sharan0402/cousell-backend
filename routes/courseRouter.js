const express = require('express');
const courseRouter = express.Router();
const {courseModel} = require('../db');
const userAuth = require('../middlewares/authUser');



courseRouter.post('/purchase', userAuth,(req, res) => {
    res.json({
        message: "post purchase endpoint"
    })
})

courseRouter.get('/preview', (req, res) => {
    res.json({
        message: "preview courses endpoint"
    })
})

module.exports = courseRouter;