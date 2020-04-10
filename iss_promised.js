const request = require('request-promise-native');
const ipApiUrl = 'https://api.ipify.org?format=json';
const coordApiUrl = 'https://ipvigilante.com/';

const fetchMyIp = () => {
  //all we need is request, because it's got a promise thing now
  return request(ipApiUrl);
};

const fetchCoordsByIp = (body) => {
  const coordUrl = coordApiUrl + JSON.parse(body).ip;
  return request(coordUrl);
}

const fetchIssFlyOverTimes = (coords) => {
  const { latitude, longitude } = JSON.parse(coords).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
}

const nextIssTimesForMyLocation = () => {
  fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchIssFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
}

module.exports = { nextIssTimesForMyLocation };
