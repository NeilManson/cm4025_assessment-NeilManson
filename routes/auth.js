const router = require('express').Router();
const passport = require('passport');


const User = require('../schemas/passportUser.js');

//create passport local strategy
passport.use(User.createStrategy());

//serialize and deserialize user
passport.serializeUser(function(user, cb) {
    process.nextTick(function(){
        return cb(null, {
            id:user.id,
            username: user.username,
            isAdmin: user.isAdmin
        })
    })
});

passport.deserializeUser(function(user,cb) {
    process.nextTick(function() {
        return cb(null, user);
    })
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// register user in db
router.post("/auth/register", async(req, res)=> {
    console.log(req.body.username)
    console.log(req.body.password)
    try{
        //register user
        
        const registerUser = await User.register({username:req.body.username, isAdmin:false}, req.body.password);
        if(registerUser){
            passport.authenticate("local")(req,res, function(){
                res.redirect("/signIn")
            });
        }else{
            res.redirect("/register");
        }
    }catch(err){
        res.send(err);
    }
});

// Login user
router.post("/auth/login", async(req,res)=>{
    //create new User object
    const user = new User({
        username:req.body.username,
        password:req.body.passport
    });
    req.login(user, (err)=>{
        if(err){
            console.log(err)
        }else{
            passport.authenticate("local")(req,res, function(){
                res.redirect("/addQuotes");
            });
        }
    })
})

router.get("/auth/logout", (req, res)=>{
    //use passport logout method
    req.logout(function(err){
        if(err) {return next(err);}
        res.redirect("/signIn")
    });
})


//export router
module.exports = router