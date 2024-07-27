const express = require('express');

const { validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const prisma = require('../../prisma/client');

const register = async (req, res) => {
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
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role,
            },
        });

        res.status(200).send({
            success: true,
            messages: "Register Successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            messages: "Internal server error",
        })
    }
};

module.exports = { register }