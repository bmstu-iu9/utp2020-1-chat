const express = require('express');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require('router');

app.get('/', function (req, res) {
    res.sendFile(__dirname+"/pages/html/login.html"); //Здесь нужен файл для страницы входа
});



app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});
