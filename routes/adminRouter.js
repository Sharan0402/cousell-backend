const {Router} = require('express');
const adminRouter = Router();
const {adminModel, courseModel} = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {requiredAdminBody, requiredUserBody, requiredCourseBody} = require('../schema');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const adminAuth = require('../middlewares/authAdmin');


adminRouter.post("/signup", async (req, res) => {
    const result = requiredAdminBody.safeParse(req.body);
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
    await adminModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: LastName
    }).then(admin => {
        res.json({
            message: "admin created successfully"
        })
    })
        .catch(err => {
            res.status(400).json({})
        })
})

adminRouter.post("/signin", async (req, res) => {
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
    const user = await adminModel.findOne({
        email: email
    }).catch(err => {
        return res.status(500).json({
            message: "error fetching user",
            error: err.message
        })
    })
    if (!user) {
        return res.status(400).json({
            message: "user not found"
        })

    }
    const password = req.body.password;
    await bcrypt.compare(password, user.password).then(result => {
        if (result) {
            const token = jwt.sign({
                id: user._id
            }, process.env.ADMIN_JWT_SECRET)
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
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

    }).catch(err => {
        return res.status(500).json({
            message: "error comparing passwords",
            error: err.message
        })
    })
})

adminRouter.use(adminAuth);

adminRouter.post("/createCourse", async (req, res) => {
    const userId = req.userId;
    req.body.creatorId = userId;

    const result = await requiredCourseBody.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "invalid request body",
            error: result.error.errors.map(err => err.message)
        })
    }
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageURL = req.body.imageURL;
    await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageURL: imageURL,
        creatorId: userId
    }).then(course => {
        return res.status(201).json({
            message: "course created successfully",
            course: course

        })
    }).catch(err => {
        return res.status(400).json({
            message: "error creating course",
            error: err.message
        })
    })


})

adminRouter.get("/courses", async (req, res) => {

    await courseModel.find({
        creatorId: req.userId
    }).then(courses => {
        res.status(200).json({
            message: "fetched all courses",
            courses: courses
        })
    }).catch(err => {
        res.status(500).json({
            message: "error fetching courses",
            error: err.message
        })
    })
})

adminRouter.delete("/course", async (req, res) => {
    const courseId = req.body.courseId;
    if (!courseId) {
        return res.status(400).json({
            message: " courseId is required"
        })
    }

    await courseModel.findOneAndDelete({
        _id: courseId
    }).then(course => {
        if (!course) {
            return res.status(404).json({
                message: "course not found"
            })
        }
        return res.status(200).json({
            message: "course deleted successfully",
            course: course
        })
    }).catch(err => {
        return res.status(500).json({
            message: "error deleting course",
            error: err.message
        })
    })
})

adminRouter.put("/course", async (req, res) => {
    const courseId = req.body.courseId;
    const courseData = req.body.courseData;
    if (!courseId || !courseData) {
        return res.status(400).json({
            message: "courseId and courseData are required"
        })
    }


    const id = new mongoose.Types.ObjectId(courseId);
    const creatorId = new mongoose.Types.ObjectId(req.userId);


    const course = await courseModel.findOneAndUpdate(
        {_id: id, creatorId: creatorId},
        {description: courseData},
    );

    if (!course) {
        return res.status(404).json({
            message: "course not found " + courseId + " " + req.userId
        });
    }
    return res.status(200).json({
        message: "course updated successfully",
        course: course
    });

})

adminRouter.post("/logout", async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: "admin logged out successfully"
    })
})


module.exports = adminRouter;