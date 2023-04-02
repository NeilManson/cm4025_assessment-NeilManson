require("dotenv").config();
const seniorRate = process.env.SENIOR;
const juniorRate = process.env.JUNIOR;
const trainingRate = process.env.TRAINING; 

// function to create a random fudge number
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

function calculateQuote(input){
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
    const trate = trainingRate;
    //initialize final cost value
    var finalCost = 0;

    if(rate == "senior"){
        finalCost = hours * (sRate*fudge) + softwareCost.reduce(function(acc, val) { return acc + val;}, 0) + hardwareCost.reduce(function(acc, val) { return acc + val;}, 0);
    }else if(rate == "junior"){
        finalCost = hours * (jRate*fudge) + softwareCost + hardwareCost;
    }else{
        finalCost = hours * (tRate*fudge) + softwareCost + hardwareCost;
    }
    return finalCost;
}

exports.calculateQuote = calculateQuote;