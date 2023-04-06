require("dotenv").config();
const seniorRate = process.env.SENIOR;
const juniorRate = process.env.JUNIOR;
const trainingRate = process.env.TRAINING;

// function to create a random fudge number
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function calculateQuote(input) {
    //create a fudge value between 0.5 and 1.25
    const fudge = randomNumber(0.5, 1.25);
    //get the values from input which is equivalent to req.body
    const hours = input.hours;
    const rate = input.employeeType;
    const softwareCost = input.softwareCost;
    const hardwareCost = input.physicalCost;
    // take user rates from .env file
    const sRate = seniorRate;
    const jRate = juniorRate;
    const tRate = trainingRate;
    //initialize final cost value
    var finalCost = 0;
    if (Array.isArray(softwareCost)) {
        if (rate == "senior") {
            finalCost = (hours * (sRate * fudge))
            finalCost += softwareCost.reduce((a, b) => Number(a) + Number(b), 0)
            finalCost += hardwareCost.reduce((a, b) => Number(a) + Number(b), 0);
        } else if (rate == "junior") {
            finalCost = (hours * (jRate * fudge))
            finalCost += softwareCost.reduce((a, b) => Number(a) + Number(b), 0)
            finalCost += hardwareCost.reduce((a, b) => Number(a) + Number(b), 0);
        } else {
            finalCost = (hours * (tRate * fudge))
            finalCost += softwareCost.reduce((a, b) => Number(a) + Number(b), 0);
            finalCost += hardwareCost.reduce((a, b) => Number(a) + Number(b), 0);
        }
    } else {
        if (rate == "senior") {
            finalCost = (hours * (sRate * fudge))
            finalCost += Number(softwareCost);
            finalCost += Number(hardwareCost);
        } else if (rate == "junior") {
            finalCost = (hours * (jRate * fudge))
            finalCost += Number(softwareCost);
            finalCost += Number(hardwareCost);
        } else {
            finalCost = (hours * (tRate * fudge));
            finalCost += Number(softwareCost);
            finalCost += Number(hardwareCost);
        }
    }
    return finalCost;
}

exports.calculateQuote = calculateQuote;