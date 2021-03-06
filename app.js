var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    //pgp           = require("pg-promise"),
    //db            = pgp('localhost:69420/database'),
    passport      = require("passport"),
    localStrategy = require("passport-local"),
    User          = require("./models/user"),
    path          = require('path'),
    flash         = require("connect-flash") ;

// module setup

app.use(bodyParser.urlencoded({extended: true})) ;
app.set("view engine", "ejs") ;
app.use(express.static(__dirname + "/public")) ;
app.use(flash()) ;
app.use(express.static(path.join(__dirname, 'public')));

/*
// passport setup

app.use(require("express-session")({
    secret: "you know nya",
    resave: false,
    saveUninitialized: false
})) ;
app.use(passport.initialize()) ;
app.use(passport.session()) ;
//passport.use(User.crea ;
passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser()) ;

app.use(function(req, res, next){
    res.locals.currentUser = req.user ;
    res.locals.error = req.flash("error") ;
    res.locals.success = req.flash("success") ;
    next() ;
})
*/

// page routes

app.get("/", function(req, res){
    res.render("index") ;
}) ;

app.get("/attend", function(req, res){
    res.render("attend") ;
}) ;

app.get("/schedule", function(req, res){
    res.render("schedule") ;
}) ;

app.get("/faq", function(req, res){
    res.render("faq") ;
}) ;

app.get("/staff", function(req, res){
    res.render("staff") ;
}) ;

// authentication routes

app.get("/register", function(req, res){
    res.render("register") ;
}) ;

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username}, {email: req.body.email}) ;
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err) ;
            req.flash("Unable to register", err.message) ;
            return res.redirect("register") ;
        }
        passport.authenticate("local")(function(req, res){
            res.redirect("back") ;
        }) ;
    }) ;
}) ;

app.get("/login", function(req, res){
    res.render("login") ;
}) ;

app.post("/login", function(req, res){
    passport.authenticate("local", {
        successRedirect: "back",
        failureRedirect: "/login",
        failureFlash: true
    }) ;
}) ;

app.get("/logout", function(req, res){
    req.logout() ;
    req.flash("success", "Logged out") ;
    res.redirect("/") ;
}) ;

// listening port

app.listen(3000, function(){
    console.log("BSB website is live")
}) ;