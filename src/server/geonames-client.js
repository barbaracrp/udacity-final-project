const http = require('follow-redirects').http;

const geonamesApiKey = process.env.GEONAMES_KEY;
const geonamesBaseURL = process.env.GEONAMES_URL;

const getGeolocation = async (city) => {
  return new Promise((resolve, reject) => {
    const options = {
      'method': 'GET',
      'hostname': geonamesBaseURL,
      'path': `/geoCodeAddressJSON?q=${encodeURI(city)}&username=${geonamesApiKey}`,
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

        const address = obj.address;
        if (!address) {
          reject('Couldn\'t find the location of your trip');
          return;
        }

        const lat = address.lat;
        const lng = address.lng;
        const countryCode = address.countryCode;

        resolve({lat, lng, countryCode});
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
