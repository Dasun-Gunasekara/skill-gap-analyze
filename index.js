import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();

dotenv.config();

app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Skill Gap Analysis API Running");
});


app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database connected successfully");

    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
})
.catch((error) => console.log(error));