const express = require('express');
const router = express.Router();
const path = require('path');

// router.get('/', (req, res) => {
//     res.status(200).render(path.join(__dirname, '../public/api.html'));
// });

const newRoute = require('./api/new');

router.use('/new', newRoute);


module.exports = router;