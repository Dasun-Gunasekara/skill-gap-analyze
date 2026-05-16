import User from "../model/userModel.js";
import Admin from "../model/adminModel.js";
import mongoose from "mongoose";


// CREATE USER
export const create = async (req, res) => {
    try {

        const { name, email, skills } = req.body;

        if (
            !name ||
            !email ||
            !skills ||
            !Array.isArray(skills) ||
            skills.length === 0
        ) {
            return res.status(400).json({
                message: "Name, email and skills are required"
            });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = new User({
            name,
            email,
            skills
        });

        const savedUser = await user.save();

        res.status(201).json(savedUser);

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};


// LOGIN USER
export const login = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};


// UPDATE OWN USER
export const update = async (req, res) => {
    try {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID format"
            });
        }

        const { name, email, skills } = req.body;

        if (
            !name ||
            !email ||
            !skills ||
            !Array.isArray(skills) ||
            skills.length === 0
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedUser);

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};


// DELETE OWN USER
export const deleteUser = async (req, res) => {
    try {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID format"
            });
        }

        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};


// VIEW ALL ROLES
export const fetchRoles = async (req, res) => {
    try {

        const roles = await Admin.find();

        if (roles.length === 0) {
            return res.status(404).json({
                message: "Roles not found"
            });
        }

        res.status(200).json(roles);

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};


// VIEW SINGLE ROLE
export const getSingleRole = async (req, res) => {
    try {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID format"
            });
        }

        const role = await Admin.findById(id);

        if (!role) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        res.status(200).json(role);

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};


// SKILL GAP REPORT
export const skillGap = async (req, res) => {
    try {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID format"
            });
        }

        const role = req.query.role;

        if (!role) {
            return res.status(400).json({
                message: "Role is required"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const adminSkills = await Admin.findOne({ role });

        if (!adminSkills) {
            return res.status(404).json({
                message: "Required skills not found"
            });
        }

        const userSkillsLower = user.skills.map(skill =>
            skill.toLowerCase()
        );

        const missingSkills = adminSkills.requiredSkills.filter(
            skill => !userSkillsLower.includes(skill.toLowerCase())
        );

        const matchedSkills = adminSkills.requiredSkills.filter(
            skill => userSkillsLower.includes(skill.toLowerCase())
        );

        let percentage = 0;

        if (adminSkills.requiredSkills.length > 0) {
            percentage =
                (matchedSkills.length /
                    adminSkills.requiredSkills.length) * 100;
        }

        let recommendation = "";

        if (missingSkills.length === 0) {
            recommendation =
                "Excellent! You are fully skilled for this role.";
        }
        else if (missingSkills.length <= 2) {
            recommendation =
                "You are close! Focus on: " +
                missingSkills.join(", ");
        }
        else {
            recommendation =
                "You need to start learning: " +
                missingSkills.join(", ");
        }

        res.status(200).json({
            student: user.name,
            role,
            currentSkills: user.skills,
            matchedSkills,
            missingSkills,
            percentageMatch: `${percentage.toFixed(2)}%`,
            recommendation
        });

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};