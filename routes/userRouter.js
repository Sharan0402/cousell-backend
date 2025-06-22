const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
    res.json({
        message: "signup endpoint"
    })
})

router.post("/signin", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})

router.get("/purchases", (req, res) => {
    res.json({
        message: "get purchases endpoint"
    })
})

module.exports = router;
