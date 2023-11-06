// Create a web server
// 1. Create a web server
// 2. Create a request handler
// 3. Start the server and listen on a port
// 4. Test with a browser
// 5. Test with curl or postman

// 1. Create a web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

// 2. Create a request handler
// 3. Start the server and listen on a port
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const comments = [
    { username: 'alice', body: 'Lorem ipsum dolor sit amet.' },
    { username: 'bob', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum?' },
    { username: 'charlie', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum?' },
    { username: 'david', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum?' },
    { username: 'eve', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum?' },
];

app.get('/', (req, res) => {
    res.render('index', { comments });
});

app.get('/new', (req, res) => {
    res.render('new');
});

// 5. Test with curl or postman
app.post('/new', [
    check('username').isLength({ min: 3 }),
    check('body').isLength({ min: 5 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(422).json({ errors: errors.array() });
        return res.render('new', { errors: errors.array() });
    }

    const { username, body } = req.body;
    comments.push({ username, body });
    res.redirect('/');
});

app.listen(3000, () => console.log('Listening on port 3000...'));



