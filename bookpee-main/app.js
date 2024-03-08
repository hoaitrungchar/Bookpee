var express = require('express');
var url = require('url');
var fs = require('fs');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
var session = require('express-session');
var cookieParser = require('cookie-parser');

const homepageRoute = require('./routes/homepage');
const signinRoute = require('./routes/signin');
const orderRoute = require("./routes/order");
const providerRoute=require("./routes/provider");
const customerRoute=require("./routes/customer");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

const cspConfig = {
    directives: {
      scriptSrc: ["'self'", "ajax.googleapis.com", "cdn.jsdelivr.net", "www.google.com"],
      frameSrc: ["'self'", "www.google.com"],
    },
  };



var app = express();
// app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.contentSecurityPolicy(cspConfig));
app.use(express.static('assets'));
app.use(limiter);
app.use(cookieParser());
app.use(session({
    secret: "Your secret key",
    resave: false,
    saveUninitialized: true,
}));
app.use("/api/homepage", homepageRoute);

app.use("/api/signin", signinRoute);


app.use("/api/order", orderRoute);

app.use("/api/provider", providerRoute);

app.use("/api/customer", customerRoute);


app.listen(8080);
