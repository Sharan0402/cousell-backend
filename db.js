const {Schema} = require('mongoose');
const mongoose = require("mongoose");
const ObjectId = Schema.Types.ObjectId;
require('dotenv').config();



const userSchema = new Schema({
    name: {
        type: String, required: true

    }, email: {
        type: String, required: true, unique: true
    }, password: {
        type: String, required: true,
    }, firstName: {
        type: String, required: true,
    }, lastName: {
        type: String,

    },


})

const courseSchema = new Schema({
    title: {
        type: String, required: true
    }, description: {
        type: String, required: true
    }, price: {
        type: Number, required: true
    }, imageURL: {
        type: String,
    }, creatorId: {
        type: ObjectId, required: true, ref: 'admins'
    },


})

const adminSchema = new Schema({
    email: {
        type: String, required: true, unique: true
    }, password: {
        type: String, required: true,
    }, firstName: {
        type: String, required: true
    }, lastName: {
        type: String,
    }


})
const paymentsSchema = new Schema({

    courseId: {
        type: ObjectId, required: true, ref: 'courses'
    }, userId: {
        type: ObjectId, required: true, ref: 'users'
    }
})

const userModel = mongoose.model('users', userSchema);
const adminModel = mongoose.model('admins', adminSchema);
const courseModel = mongoose.model('courses', courseSchema);
const paymentModel = mongoose.model('payments', paymentsSchema);

module.exports = {
    userModel: userModel, adminModel: adminModel, courseModel: courseModel, paymentModel: paymentModel
}
