
const router = require('express').Router();

const Quote = require('../schemas/Quote.js');
const quoteCalculator = require('../public/js/quote_calculator.js');



//quote calculator



router.get("/quotes", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            if (req.user.isAdmin) {
                const allQuotes = await Quote.find();
                
                res.render("quotes", { allQuotes, isAuth: req.isAuthenticated() });
            } else {
                const allQuotes = await Quote.find({ user: req.user.username });
                console.log(allQuotes);
                res.render("quotes", { allQuotes, isAuth: req.isAuthenticated() });
            }
        } catch (err) {
            res.send(err);
        }
    } else {
        res.redirect("signIn");
    }
})

// post routes
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

module.exports = router