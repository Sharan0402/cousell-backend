const express = require('express');
const userRouter = express.Router();
const {userModel} = require('../db');

userRouter.post('/signup', (req, res) => {
    res.json({
        message: "signup endpoint"
    })
})

userRouter.post("/signin", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})

userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "get purchases endpoint"
    })
})

module.exports = userRouter;
