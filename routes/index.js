const express = require('express');
const path = require('path');
const db = require('../db');
const { baseUrl } = require('../config');

const router = express.Router();

const apiRoute = require('./api');
router.use('/api', apiRoute);

router.get('/', async (req, res) => {
    res.status(200).render(path.join(__dirname, '../public/index.html'), {base:baseUrl});
});

router.get('/:code', async(req, res) => {
    try {
        if (Object.values(await db.checkIfSlugExists(req.params.code))[0] === 1) {
            res.redirect(302, Object.values(await db.selectByShortId(req.params.code))[0]);
        } else {
            res.status(404).sendFile(path.join(__dirname, '../public/404.html'), {home:baseUrl});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error!'
        });
    };
});

module.exports = router;