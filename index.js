const express = require('express');
const app = express();

app.use(express.json());

app.post('/user/register', (req, res) => {
    res.json({
        messsage: "signup endpoint"
    })
})

app.post("user/signin", (req, res) => {
    res.json({
        message: "signin endpoint"
    })
})

app.get("user/purchases", (req, res) => {
    res.json({
        message: "get purchases endpoint"
    })
})
app.post("/course/purchase", (req, res) => {
    res.json({
        message: "post purchase endpoint"
    })
})

app.get("/courses", (req, res) => {
    res.json({
        message: "get courses endpoint"
    })
})






app.listen(3000);