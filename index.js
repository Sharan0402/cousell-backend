const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

async function connectToDatabase() {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to database");

    }catch(e){
        console.log(e);
    }

}
app.use(express.json());
const userRouter = require("./routes/userRouter");
const courseRouter = require("./routes/courseRouter");
const adminRouter = require("./routes/adminRouter");
app.use("/user", userRouter);

app.use("/course", courseRouter);

app.use("/admin",adminRouter)


connectToDatabase().catch(e => console.log(e));
app.listen(process.env.PORT);