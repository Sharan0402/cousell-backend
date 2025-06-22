const express = require('express');
const userRouter = express.Router();

const {userModel} = require('../db');
const userAuth = require('../middlewares/authUser');
const {requiredUserBody} = require('../schema');

userRouter.post('/signup', async (req, res) => {
    const result = await requiredUserBody.safeParseAsync(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "invalid request body",
            error: result.error.errors.map(err => err.message)
        })
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const LastName = req.body.lastName;

    await userModel.create({
        name: name,
        email: email,
        password: password,
        firstName: firstName,
        lastName: LastName

    }).then(user => {
        res.json({
            message: "user created successfully"
        })
    })
    .catch(err => {
        res.status(400).json({
            message: "user already exists"
        })
    })



})

userRouter.post("/signin", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})
userRouter.use(userAuth);

userRouter.get("/purchases", (req, res) => {
    res.json({
        message: "get purchases endpoint"
    })
})

module.exports = userRouter;
