// index.js
const { nextIssTimesForMyLocation } = require('./iss');

nextIssTimesForMyLocation((error, flyTimes) => {
  if (error) return console.log("It didn't work!:", error, "\n--------");
  for (let time of flyTimes) {
    let date = new Date(time.risetime * 1000);
    console.log(`Next pass at ${date} for ${time.duration} seconds!`)
  }
});

const printPassTimes = (flyTimes) => {
  for (let time of flyTimes) {
    let date = new Date(time.risetime * 1000);
    console.log(`Next pass at ${date} for ${time.duration} seconds!`)
  }
}

module.exports = { printPassTimes };
