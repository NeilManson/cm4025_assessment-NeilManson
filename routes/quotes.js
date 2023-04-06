
const router = require('express').Router();

const Quote = require('../schemas/Quote.js');

//quote calculator
const quoteCalculator = require('../public/js/quote_calculator.js');





// get routes
router.get("/addQuotes", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("addQuotes")
    } else {
        res.redirect("/signIn")
    }

})

router.get("/quotes", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            if (req.user.isAdmin) {
                const allQuotes = await Quote.find();

                res.render("quotes", { allQuotes, isAuth: req.isAuthenticated() });
            } else {
                const allQuotes = await Quote.find({ user: req.user.username });
                res.render("quotes", { allQuotes, isAuth: req.isAuthenticated() });
            }
        } catch (err) {
            res.send(err);
        }
    } else {
        res.redirect("signIn");
    }
})

// route to render editQuote page with values from the DB
router.get("/editQuotes/:name", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const quoteToEdit = await Quote.findOne({ quoteName: req.params.name });
            res.render("editQuote", { quoteToEdit, isAuth: req.isAuthenticated() });
        } catch (err) {
            res.send(err);
        }
    } else {
        console.log("err")
        res.redirect("/signIn")
    }
})

// route to delete quote from db
router.get("/deleteQuote/:name", async (req, res) => {
    if(req.isAuthenticated()) {
        try{
            const quoteToDelete = await Quote.findOneAndDelete({ quoteName: req.params.name});
            res.redirect("/quotes");
        }catch(err){
            res.send(err);
        }
    }
    else{
        console.log("err");
        res.redirect("/signIn")
    }
})

// post routes

//route to add quote to db
router.post("/addQuote", async (req, res) => {
    try {
        const quoteValue = quoteCalculator.calculateQuote(req.body);
        const quote = new Quote({
            quoteName: req.body.quoteName,
            user: req.user.username,
            hourRate: req.body.employeeType,
            hours: req.body.hours,
            physicalCost: req.body.physicalCost,
            softwareCost: req.body.softwareCost,
            finalQuote: quoteValue
        })
        //save quote to db
        const saveQuote = quote.save();
        //redirect to quotes page if quote save is successful
        res.redirect('/quotes');
    } catch (err) {
        res.send(err);
    }
})

//route to update quote in db
router.post('/editQuote/:name', async (req, res) => {
    try {
        const quoteValue = quoteCalculator.calculateQuote(req.body)
        const quote = {
            quoteName: req.body.quoteName,
            user: req.user.username,
            hourRate: req.body.employeeType,
            hours: req.body.hours,
            physicalCost: req.body.physicalCost,
            softwareCost: req.body.softwareCost,
            finalQuote: quoteValue
        };
        const update = await Quote.findOneAndUpdate({quoteName: req.params.name}, quote)
        res.redirect("/quotes");
    }catch(err){
        res.send(err);
    }
})



module.exports = router