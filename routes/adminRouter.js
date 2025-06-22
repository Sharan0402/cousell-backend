const {Router} = require('express');
const adminRouter = Router();
const {adinModel} = require('../db');
const adminAuth = require('../middlewares/authAdmin');



adminRouter.post("/signup", (req, res) => {
    res.json({
        message: "admin signup endpoint"
    })
})

adminRouter.post("/signin", (req, res) => {
    res.json({
        message: "admin signin endpoint"
    })
})

adminRouter.use(adminAuth);

adminRouter.post("/createCourse", (req, res) => {
    res.json({
        message: "admin create endpoint"
    })
})

adminRouter.get("/courses", (req, res) => {
    res.json({
        message: "admin get course endpoint"
    })
})

adminRouter.delete("/course", (req, res) => {
    res.json({
        message: "admin delete course endpoint"
    })
})
adminRouter.put("/course", (req, res) => {
    res.json({
        message: "admin update course endpoint"
    })
})


module.exports = adminRouter;