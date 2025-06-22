const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());
const userRouter = require("./routes/userRouter");
const courseRouter = require("./routes/courseRouter");
const adminRouter = require("./routes/adminRouter");
app.use("/api/v1/user", userRouter);

app.use("/api/v1/course", courseRouter);

app.use("/api/v1/admin",adminRouter);


connectToDatabase().catch(e => console.log(e));
app.listen(process.env.PORT);