const express = require('express');
const app = express();

app.use(express.json());
const userRouter = require("./routes/userRouter");
const courseRouter = require("./routes/courseRouter");

app.use("/user", userRouter);

app.use("/course", courseRouter);



app.listen(3000);