const {z, string} = require('zod')
const mongoose = require("mongoose");

const requiredUserBody = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),

})
const requiredAdminBody = z.object({

    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
})

const requiredCourseBody = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(1000),
    price: z.number().min(1),
    imageURL: z.string().url(),
    creatorId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),

})
const requiredPaymentBody = z.object({
    courseId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
    userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val))

})

module.exports = {
    requiredUserBody: requiredUserBody,
    requiredAdminBody: requiredAdminBody,
    requiredCourseBody: requiredCourseBody,
    requiredPaymentBody: requiredPaymentBody
}