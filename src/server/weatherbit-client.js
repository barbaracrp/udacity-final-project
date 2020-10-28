const https = require('follow-redirects').https;
//Weatherbit
const weatherBitApiKey = process.env.WEATHERBIT_API_KEY;
const weatherBitBaseURL = process.env.WEATHERBIT_URL;

const getWeatherForecastAtCityByDate = async (city, date) => {
  return new Promise((resolve, reject) => {
    const options = {
      'method': 'GET',
      'hostname': weatherBitBaseURL,
      'path': `/v2.0/forecast/daily?city=${encodeURI(city)}&key=${weatherBitApiKey}`,
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

        const fullLocation = `${obj.city_name}, ${obj.state_code}, ${obj.country_code}`;
        const forecast = obj.data.find((f) => f.valid_date === date);
        const tempMin = forecast.min_temp;
        const tempMax = forecast.max_temp;
        const weatherDesc = forecast.weather.description;
        const weatherIcon = `https://www.weatherbit.io/static/img/icons/${forecast.weather.icon}.png`;

        resolve({fullLocation, tempMin, tempMax, weatherDesc, weatherIcon});
      });

      response.on("error", function (error) {
        console.error(error);
        reject(error);
      });
    });

    request.end();
  })
}

module.exports = {getWeatherForecastAtCityByDate};
