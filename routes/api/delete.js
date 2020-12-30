const express = require('express');
const router = express.Router();
const { adminPassword } = require('../../config');

router.get('/', async (req, res) => {
    const auth = req.query.pass;
    if (!auth) {
        res.status(401).json({
            status: 401,
            error: 'Unauthorized!'
        });
    } else {
        if (auth === adminPassword) {
            res.status(200).json({
                status: 200,
                message: 'Successful Authentication!'
            });
        } else {
            res.status(401).json({
                status: 401,
                error: 'Unauthorized!'
            });
        };
    }
});

module.exports = router;