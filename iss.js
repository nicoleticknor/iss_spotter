const request = require('request');
const ipApiUrl = 'https://api.ipify.org?format=json';
const coordApiUrl = 'https://ipvigilante.com/';

const fetchMyIp = (cb) => {
  request(ipApiUrl, (e, r, body) => {
    if (e) return cb(e, null);
    if (r.statusCode !== 200) {
      const msg = `Status Code ${r.statusCode} when fetching IP. Response: ${body}`;
      cb(e(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    cb(null, ip);
  });
};

const fetchCoordsByIp = (ip, cb) => {
  request(coordApiUrl + ip, (e, r, body) => {
    if (e) return cb(e, null);
    if (r.statusCode !== 200) {
      const msg = `Status Code ${r.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }
    // const lat = JSON.parse(body).data.latitude;
    // const lng = JSON.parse(body).data.longitude;
    // const coords = {};
    // coords.latitude = lat;
    // coords.longitude = lng;
    // cb(null, coords);

    //here's a better way of doing it thanks to destructuring that I still need to learn
    const { latitude, longitude } = JSON.parse(body).data;
    cb(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, cb) => {

  const issApiUrl = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(issApiUrl, (e, r, body) => {
    if (e) return cb(e, null);
    if (r.statusCode !== 200) {
      const msg = `Status Code ${r.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }
    cb(null, JSON.parse(body).response);
  });
};

const nextIssTimesForMyLocation = (cb) => {
  //this function chains together the above functions when it's called by the index.js function
  fetchMyIp((error, ip) => {
    if (error) return console.log("Failed to fetch IP", error, "\n------");
    else fetchCoordsByIp(ip, (error, coords) => {
      if (error) return console.log("Failed to fetch coords", error, "\n------");
      else fetchISSFlyOverTimes(coords, (error, flyTimes) => {
        if (error) return cb(error, null);
        else return cb(null, flyTimes);
      });
    });
  });
};

module.exports = { nextIssTimesForMyLocation };
