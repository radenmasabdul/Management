const express = require('express');

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Unauthenticated' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.userId = decode.id;
        next();
    });
};

module.exports = verifyToken;