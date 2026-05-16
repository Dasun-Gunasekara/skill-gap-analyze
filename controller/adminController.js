import Admin from "../model/adminModel.js";
import User from "../model/userModel.js";
import mongoose from "mongoose";


// CREATE ROLE
export const createSkills = async (req, res) => {
    try {

        const { role, requiredSkills } = req.body;

        if (
            !role ||
            !requiredSkills ||
            !Array.isArray(requiredSkills) ||
            requiredSkills.length === 0
        ) {
            return res.status(400).json({
                message: "Role and skills are required"
            });
        }

        const roleExist = await Admin.findOne({ role });

        if (roleExist) {
            return res.status(400).json({
                message: "Role already exists"
            });
        }

        const newRole = new Admin({
            role,
            requiredSkills
        });

        const savedRole = await newRole.save();

        res.status(201).json(savedRole);

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};


// VIEW ALL ROLES
export const fetchSkills = async (req, res) => {
    try {

        const roles = await Admin.find();

        res.status(200).json(roles);

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};


// VIEW SINGLE ROLE
export const getSingleSkill = async (req, res) => {
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


// UPDATE ROLE
export const updateSkills = async (req, res) => {
    try {

        const id = req.params.id;

        const roleExist = await Admin.findById(id);

        if (!roleExist) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        const updatedRole = await Admin.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedRole);

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};


// DELETE ROLE
export const deleteSkills = async (req, res) => {
    try {

        const id = req.params.id;

        const roleExist = await Admin.findById(id);

        if (!roleExist) {
            return res.status(404).json({
                message: "Role not found"
            });
        }

        await Admin.findByIdAndDelete(id);

        res.status(200).json({
            message: "Role deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};


// VIEW ALL USERS
export const fetchUsers = async (req, res) => {
    try {

        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({
                message: "Users not found"
            });
        }

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};


// VIEW SINGLE USER
export const getSingleUser = async (req, res) => {
    try {

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID format"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            error: "Internal Server Error"
        });

    }
};