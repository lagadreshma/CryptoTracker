const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");

const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const con = require("./connection");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const session = require('express-session');
app.use(session({
    secret: 'poppie pants',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

const publicDir = path.join(__dirname + '/public');
app.use(express.static(publicDir));

// parse URL encoded bodies(as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// parse JSON bodies
app.use(express.json());

app.set('view engine', 'hbs');



// for fecthing pages get requests
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.render('login', { message: 'Please Enter Your Email and Password.' });
    } else {
        con.query('SELECT * FROM users WHERE email=?', [email], async (error, result) => {

            if (error) console.log(error);

            if (!result.length || !await bcrypt.compare(password, result[0].password)) {
                return res.render('login', { message: 'Incorrect Email or Password.' });
            } else {
                res.render("home");
            }

        });
    }

});

app.get('/register', (req, res) => {
    res.render("register");
});


// For Registration post request
app.post("/register", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    console.log(name, email, password, cpassword);

    const selectQuery = "SELECT * FROM users";

    let userEmail = req.query.email;

    con.query(selectQuery, userEmail, async (error, results) => {

        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            if (email == userEmail) {
                return res.render('register', { message: 'That Email is Already in use' });
            }
        } else if (password !== cpassword) {
            return res.render('register', { message: 'Password do not match' });
        }

        // by default and secure round password is 8
        let hashpassword = await bcrypt.hash(password, 8);


        console.log(hashpassword);

        const insertQuery = "INSERT INTO users(username, email, password) VALUES('" + name + "', '" + email + "' , '" + hashpassword + "')";

        con.query(insertQuery, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Data Uploaded.");

                res.render("login");

            }

        });


    });


});


// for currency converter page before login
app.get('/converter', (req, res) => {
    res.render("converter");
});

// for news page before login
app.get('/news', (req, res) => {
    res.render("news");
});

// for cryptocurrencies page before login
app.get('/cryptocurrency', (req, res) => {
    res.render("cryptocurrency");
});



// after login display home page
app.get('/home', (req, res) => {
    res.render("home", { name: 'Reshma' });
});


// for currency converter after login
app.get('/user_converter', (req, res) => {
    res.render("user_converter");
});

// for news page after login
app.get('/user_news', (req, res) => {
    res.render("user_news");
});

// for crypto currencies page after login
app.get('/user_cryptocurrency', (req, res) => {
    res.render("user_cryptocurrency");
});

// for watchlist page 
app.get('/watchlist', (req, res) => {
    res.render("watchlist");
});



// for logout
app.get('/logout', (req, res) => {
    res.render("index");
});



// host on port 5000
app.listen(5000, () => {
    console.log("Server is up and running");
});