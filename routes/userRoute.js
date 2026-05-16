import express from "express";

import {
    create,
    login,
    update,
    deleteUser,
    fetchRoles,
    getSingleRole,
    skillGap
} from "../controller/userController.js";

const userRouter = express.Router();


// USER PROFILE
userRouter.post("/create", create);
userRouter.post("/login", login);

userRouter.put("/update/:id", update);

userRouter.delete("/delete/:id", deleteUser);


// ROLE VIEWING
userRouter.get("/roles", fetchRoles);

userRouter.get("/role/:id", getSingleRole);


// SKILL GAP
userRouter.get("/skillgap/:id", skillGap);

export default userRouter;