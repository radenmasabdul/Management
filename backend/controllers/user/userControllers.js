const express = require('express');

const prisma = require('../../prisma/client');

const { validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const e = require('express');

//get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
            orderBy: {
                id: "desc",
            }
        });

        res.status(200).send({
            success: true,
            messages: "Get all users successfully",
            data: users,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

//create user
const createUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            messages: "Validation Error",
            errors: errors.array(),
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const users = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role,
            }
        });

        res.status(200).send({
            success: true,
            messages: "User created successfully",
            data: users,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

//get users by id
const getUsersById = async (req, res) => {
    const { id } = req.params;

    try {
        const users = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });

        res.status(200).send({
            success: true,
            messages: `Get User By Id : ${id}`,
            data: users,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            messages: "Internal Server Error",
        });
    }
};

//update users
const updateUsers = async (req, res) => {
    const { id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            messages: "Validation Error",
            errors: errors.array(),
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const users = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role,
            }
        });

        res.status(200).send({
            success: true,
            messages: "User updated successfully",
            data: users,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

//delete users
const deleteUsers = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.user.delete({
            where: {
                id: Number(id),
            }
        });

        res.status(200).send({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { getAllUsers, createUser, getUsersById, updateUsers, deleteUsers }