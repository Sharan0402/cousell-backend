const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {userModel, paymentModel,courseModel} = require('../db');
const userAuth = require('../middlewares/authUser');
const {requiredUserBody} = require('../schema');
require('dotenv').config();

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
    const hashedPassword = await bcrypt.hash(password, 5).catch(err => {
        console.log(err);
    });

    await userModel.create({
        name: name,
        email: email,
        password: hashedPassword,
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

userRouter.post("/signin", async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({
            message: "email is required"
        })
    }
    if (!req.body.password) {
        return res.status(400).json({
            message: "password is required"
        })

    }
    const user = await userModel.findOne({
        email: email
    })
    if (!user) {
        return res.status(400).json({
            message: "user not found"
        })
    }

    const password = req.body.password;
    bcrypt.compare(password, user.password).then(result => {
        if (result) {
            const token = jwt.sign({
                id: user._id
            }, process.env.USER_JWT_SECRET)
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            })
            res.json({

                message: "user signed in successfully"
            })
        } else {
            res.status(400).json({
                message: "invalid email or password"
            })
        }
    })
})

userRouter.use(userAuth);

userRouter.get("/purchases", async (req, res) => {
    const purchases = await paymentModel.find({
        userId: req.userId

    }).catch(
        err => {
            return res.status(500).json({
                message: "error fetching purchases",
                error: err.message
            })

        }
    )
    const courseData = await courseModel.find({
        _id: { $in : purchases.map(purchase => purchase.courseId) }
    })

    return res.json({
        purchases: purchases,
        courses: courseData
    })

})

userRouter.post("/logout", async (req, res) => {
    res.clearCookie('token');
    return res.json({
        message: "user logged out successfully"
    })
})

module.exports = userRouter;
