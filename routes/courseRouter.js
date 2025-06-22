const express = require('express');
const courseRouter = express.Router();
const {courseModel,paymentModel} = require('../db');
const userAuth = require('../middlewares/authUser');



courseRouter.post('/purchase', userAuth,async (req, res) => {
    const courseId = req.body.courseId;
    if (!courseId) {
        return res.status(400).json({
            message: "courseId is required"
        });
    }
    try{
    const course = await courseModel.findOne({
        _id: courseId
    })
        if (!course) {
            return res.status(404).json({
                message: "course not found"
            });
        }
    const payment = await paymentModel.create({
        userId: req.userId,
        courseId: courseId,

    })
    return res.status(200).json({
        message: "course purchased successfully",
        payment: payment
    })}
    catch (e){
        return res.status(400).json({
            message: "invalid courseId"
        });
    }

})

courseRouter.get('/preview', async (req, res) => {

    const courseId = req.query.courseId;
    if (!courseId) {
        return res.status(400).json({
            message: "courseId is required"
        });
    }
    await courseModel.findOne({
        _id: courseId
    }).then(course => {
        if (!course) {
            return res.status(404).json({
                message: "course not found"
            });
        }
        return res.status(200).json({
            message: "course preview fetched successfully",
            course: course
        });
    }).catch(err => {
        return res.status(500).json({
            message: "error fetching course preview",
            error: err.message
        });
    })
})

module.exports = courseRouter;