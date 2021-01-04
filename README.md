# Autora

Autora is a URL Shortener made using Express.js and SQLITE. It's very easy to setup, the following are the requirements:

- Node.js v14+.
- Full permissions to the folder autora run's in.

### How to Setup:

1. `git clone https://github.com/CosmicIceDev/autora`
2. `cd autora`
3. `npm install`
4. Modify config.js with your own values.
5. Create a file with the same name as you've entered in config.js. Keep it as `autora.sqlite3` if you don't know what you're doing.
6. Use pm2 (`npm i -g pm2`, `pm2 start index.js`) or run the server using `node index.js`

Congrats! You've setup your own instance of Autora!

Feel free to contribute, and create an Issue if any.

(c) [cosmicice](https://github.com/cosmicice) 2020. This project is licensed under the [Creative Commons Zero v1.0 Universal License](https://github.com/CosmicIceDev/autora/blob/master/LICENSE).
