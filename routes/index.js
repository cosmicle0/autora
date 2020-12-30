const express = require('express');
const path = require('path');

const router = express.Router();

const apiRoute = require('./api');
router.use('/api', apiRoute);

router.get('/', async (req, res) => {
    res.status(200).render(path.join(__dirname, '../public/index.html'));
});

module.exports = router;