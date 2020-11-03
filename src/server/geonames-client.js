const http = require('follow-redirects').http;

const geonamesApiKey = process.env.GEONAMES_KEY;
const geonamesBaseURL = process.env.GEONAMES_URL;

const getGeolocation = async (city) => {
  return new Promise((resolve, reject) => {
    const options = {
      'method': 'GET',
      'hostname': geonamesBaseURL,
      'path': `/searchJSON?q=${encodeURI(city)}&username=${geonamesApiKey}&maxRows=2`,
      'headers': {
      },
      'maxRedirects': 20
    };
    const request = http.request(options, function (response) {
      const chunks = [];

      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
      response.on("end", function (chunk) {
        const body = Buffer.concat(chunks);
        const obj = JSON.parse(body.toString());

        if (obj.totalResultsCount === 0) {
          reject('Couldn\'t find the location of your trip');
          return;
        }
        const address = obj.geonames[0];

        const fullLocation = `${address.name}, ${address.countryName}`;
        const lat = address.lat;
        const lng = address.lng;

        resolve({lat, lng, fullLocation});
      });

      response.on("error", function (error) {
        console.error(error);
        reject(error);
      });
    });

    request.end();
  })
}

module.exports = {getGeolocation};
