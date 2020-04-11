const request = require('request-promise-native');

const fetchMyIP = () => {
  // request(url, (e, r, b)) <-- in OG request, we needed the callback as the second argument. in request-promise-native, it returns a promise, so we don't need the callback (because it returns...)
  // Don't forget to return!
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  //via promises and chaining, we are passing in the 'body' returned from the fetchMyIP function above. It's in JSON format, so we need to parse out just the value string
  //we parse (body).ip even though it's only one K:V pair because we just want the V
  ip = JSON.parse(body).ip;
  //switching this to a template literal with the url in it cuz declaring it up top is actually less readable IMO
  //return!
  return request(`https://ipvigilante.com/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  //passing in the data returned from fetchCoordsByIP (parameter still referred to as "body")
  //need to JSON.parse out just the lat/long. We can do that in the cool destructuring way that I need to learn
  //so in setting up the { latitude, longitude } on the left-hand side, the right-hand side of the function knows that within "data" we are just looking for the values associated with the "latitude" and "longitude" keys. 
  //for clarity, the '.data' piece is because the coords JSON has two KV pairs in it, and the second one's key is called "data" and its value is the data object which contains the lat and long properties
  const { latitude, longitude } = JSON.parse(body).data
  //request to ISS API using a template literal because then it's easier to interpolate in the lat long obtained with the destructuring syntax
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
  //don't forget to return ;) 
};

//we are now going to refactor to package all the functions above into one, using the chaining protocol, so that we only have to call one function from our index doc before we do some other magical things on that doc to display the output
//since we are invoking this function from the beginning, it won't take any arguments itself
const nextISSFlightTimesForMyLocation = () => {
  //it will call fetchMyIP, which it knows about cuz it's in the global scope
  //note that when we call fetchMyIP, it sets off the chain of callbacks below, which will ultimately return "response"
  //we need to make this higher order function return something too. To do that, we place return at the very beginning of the chain. 
  //this of it like this:
  //higherOrderFunction = () => {
  //return valueComputedByCallbacks. 
  //but we can't declare this valueComputedByCallbacks by triggering the chain and then writing return below, because of async. so we need to write the return inline with invoking the first function in the chain
  //}
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    //but now we have some JSON data to parse.
    //hen there's an anonymouse callback inside a .then callback, you need to pass in the data from the previous return, and that callback, so the anon callback knows what to operate on. 
    //this differs from the then(body => console.log) because console.log is not a function, it's an expression that prints to console. instead, anon callback is a function that will return a value
    .then((data) => {
      //we are interested in an array of objects that is the value of the "response" key
      //we will use destructuring syntax for this expression, because we want to store an array of objects as well (same format), but we are lazy and only want to write one line of code instead of two or three.
      //deciphering this desctructing syntax: we will store the value of each object {  } element within the array associated with the .response key, nested together within an array. We will refer to this array as the variable const reponse
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {
  nextISSFlightTimesForMyLocation
};
