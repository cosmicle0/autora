const express = require('express');
const app = express();
const path = require('path');

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
    console.log(`> Server Running on localhost:${port}`);
});