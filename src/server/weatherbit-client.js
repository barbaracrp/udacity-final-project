const https = require('follow-redirects').https;
//Weatherbit
const weatherBitApiKey = process.env.WEATHERBIT_API_KEY;
const weatherBitBaseURL = process.env.WEATHERBIT_URL;

function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second-first)/(1000*60*60*24));
}

const getWeatherForecastAtLocationByDate = async (geolocation, date) => {
  return new Promise((resolve, reject) => {
    const today = new Date();
    const tripDate = new Date(date);
    const dateDiff = datediff(today, tripDate);
    const api = dateDiff > 16 ? 'history' : 'forecast';

    let path = `/v2.0/${api}/daily?lat=${geolocation.lat}&lon=${geolocation.lng}&key=${weatherBitApiKey}`;
    if (api === 'history') {
      const years = (tripDate.getFullYear() - today.getFullYear()) + 1;

      tripDate.setDate(tripDate.getDate() - years * 365);
      const startDate = tripDate.toISOString().split('T')[0];
      tripDate.setDate(tripDate.getDate() + 1);
      const endDate = tripDate.toISOString().split('T')[0];

      path += `&start_date=${startDate}&end_date=${endDate}`;
    }
    const options = {
      'method': 'GET',
      'hostname': weatherBitBaseURL,
      'path': path,
      'headers': {
      },
      'maxRedirects': 20
    };
    const request = https.request(options, function (response) {
      const chunks = [];

      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
      response.on("end", function (chunk) {
        const body = Buffer.concat(chunks);
        const obj = JSON.parse(body.toString());

        const forecast = api === 'history' ? obj.data[0] : obj.data.find((f) => f.valid_date === date);
        const tempMin = `${forecast.min_temp} &deg;C`;
        const tempMax = `${forecast.max_temp} &deg;C`;
        const weatherInfo = {tempMin, tempMax};

        if (forecast.weather) {
          weatherInfo.weatherDesc = forecast.weather.description;
          weatherInfo.weatherIcon = `https://www.weatherbit.io/static/img/icons/${forecast.weather.icon}.png`;
        }

        resolve(weatherInfo);
      });

      response.on("error", function (error) {
        console.error(error);
        reject(error);
      });
    });

    request.end();
  })
}

module.exports = {getWeatherForecastAtLocationByDate};
