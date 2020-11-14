const http = require('http');
const path = require('path');
const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const autoprefixer = require('express-autoprefixer');
const {logger, errorLogger, expressErrorLogger} = require('./logger');
const {getNews} = require('./news');
const {getPhrases} = require('./phrases');

const port = process.env.PORT || 3000;
const app = express();
const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));
app.set('view engine', 'pug');
app.use(sassMiddleware({
    src: __dirname,
    dest: publicPath,
    force: true,
    debug: true
}))
app.use(autoprefixer({ browsers: 'last 5 versions', cascade: false }))

app.get('/', async (req, res) => {
    let news = [];
    let phrases = [];
    getPhrases('http://slowpoke.desigens.com/json/2/3000')
        .then(data => {
            phrases = data;
        })
        .catch(err => {
            console.log(err);
        });

    await getNews('http://slowpoke.desigens.com/json/1/7000')
        .then(data => {
            news = data;
        })
        .catch(err => {
            console.log(err);
        })

    res.render('index', {
        news,
        phrases
    })
});

app.use(expressErrorLogger);

http.createServer(app).listen(port, () => {
    console.log(`Listen to server on port ${port}`);
});