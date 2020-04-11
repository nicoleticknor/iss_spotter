//don't forget to destructure {  } the module.exports object
const { nextISSFlightTimesForMyLocation } = require('./iss_promised');
// ------Mentor Question ---------- what??
const { printPassTimes } = require('./index');


//invoke the main function
nextISSFlightTimesForMyLocation()
  //logging the "response" array to the console.
  //since it's passed in as an argument to the "body" parameter for this .then
  // .then(body => console.log(body));
  //--------------------------------------
  //but that's not a very userfriendly output... milliseconds since Jan 1 1970 is not how I think about time as a human. Let's do some conversion.
  //to do the conversion, require index from the previous callback version of this 
  //this is a function printPassTimes which takes an argument
  //Take a look at this syntax. The callback we are using here involves the data which we are calling "body", and the printPassTimes function. So we need to pass in both the data and an anon callback which invokes that printPassTimes function with the data.
  /************** MENTOR QUESTION *****************/
  //const printPassTimes automatically invokes that function without invoking it from within the below .this method.
  //i have no idea why it does that. Perhaps contact a mentor about this.
  // .this((body) => {
  //   printPassTimes(body);
  // })
  //--------------------------------------
  //so now we put on our catch. what we want to log is the message value from the error object
  .catch((e) => {
    console.log("It didn't work:", e.message);
  })

/*
---------historic code left here for notes purposes--------

call the first function
fetchMyIP()
-----------------------------
we are then calling the next function and passing in the value returned from fetchMyIP
this .then is calling fetchCoordsByIP as a callback to fetchMyIP
that's why it's written like a callback, and doesn't explicity take a callback itself (to avoid callback hell).
remember nesting cb(data)? This is that same format. When we call fetchCoordsByIP, it already knows about the (body) Promise, because chaining is like calling it from inside fetchMyIP which returned it.
Don't forget - a lot of the syntax is working under the hood of request-promise-native and Promise object & chaining methods build that you don't know about yet, so that's why you might not intuitively get it immediately
.then(fetchCoordsByIP)
-----------------------------
calling fetchISSFlyOverTimes as a callback to fetchCoordsByIP
.then(fetchISSFlyOverTimes)
-----------------------------
this .then takes a callback that simply prints the returned value to the console
.then(body => console.log(body))
-----------------------------
.catch takes a callback with a parameter. I don't know why it's in double brackets but the .then above is not.
.catch((e) => {
  console.log("It didn't work:", e.message);
});
*/
