const { nextIssTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index');


nextIssTimesForMyLocation()
  // .catch((error) => {
  //   console.log("it didn't work", error.message);
  // });
