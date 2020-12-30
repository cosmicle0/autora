const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.status(200).render(path.join(__dirname, '../public/api.html'));
});

const newRoute = require('./api/new');
const deleteRoute = require('./api/delete');

router.use('/new', newRoute);
router.use('/delete', deleteRoute);


module.exports = router;