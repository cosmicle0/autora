const express = require('express');
const app = express();
const path = require('path');
const db = require(path.join(__dirname, './db.js'));

// Importing config variables
const { port, baseUrl } = require('./config');

// App Settings
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// App Usages
app.use('/', require('./routes/index'));

// Handling 404
app.use((req, res) => {
    const home = baseUrl;
    res.status(404).render(path.join(__dirname, './public/404.html'), {home:home});
});

// Starting the Server
app.listen(port, () => {
    console.log('\x1b[1m', `> SERVER RUNNING ON http://127.0.0.1:${port}`);
    try {
        db;
        db.createTable();
    } catch (err) {
        console.log(err);
    }
});