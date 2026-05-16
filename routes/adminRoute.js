import express from "express";

import {
    createSkills,
    fetchSkills,
    getSingleSkill,
    updateSkills,
    deleteSkills,
    fetchUsers,
    getSingleUser
} from "../controller/adminController.js";

import { adminOnly } from "../middleware/auth.js";

const adminRouter = express.Router();


// ROLE MANAGEMENT (ADMIN ONLY)
adminRouter.post("/create", adminOnly, createSkills);
adminRouter.get("/getskills", adminOnly, fetchSkills);
adminRouter.get("/getskill/:id", adminOnly, getSingleSkill);
adminRouter.put("/update/:id", adminOnly, updateSkills);
adminRouter.delete("/delete/:id", adminOnly, deleteSkills);


// USER MANAGEMENT (ADMIN ONLY)
adminRouter.get("/users", adminOnly, fetchUsers);
adminRouter.get("/user/:id", adminOnly, getSingleUser);

export default adminRouter;