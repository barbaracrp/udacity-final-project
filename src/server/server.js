const assert = require('assert');
const dotenv = require('dotenv');
dotenv.config();

assert(process.env.WEATHERBIT_API_KEY, 'WEATHERBIT_API_KEY should be set');
assert(process.env.PIXABAY_API_KEY, 'PIXABAY_API_KEY should be set');

const weatherBitClient = require('./weatherbit-client');

//Pixabay
const pixaBayApiKey = process.env.PIXABAY_API_KEY;
const pixaBayBaseURL = process.env.PIXABAY_URL;

// Require Express to run server and routes
const express = require('express'); //importando o express

// Start up an instance of app
const app = express(); // servidor express

const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false })); // para entender urls que trazem parametros
app.use(bodyParser.json()); // para entender requisicóes json

// Cors for cross origin allowance
const cors = require('cors'); // package q permite browser e server conversar um com o outro
app.use(cors());              // sem secutity interrupcoes

// Initialize the main project folder
// allows us to write server-side code that can them connect to client-side code wich would be in a folder called website
app.use(express.static('dist')); //pointed our app to the folder that we want them to look at.(connects our server-side code (server.js) to our client side code (website)folder)

// Setup Server
const port = 3000;
const server = app.listen(port, listening); //fala pro server qual porta e callback func

function listening(){
  console.log('server running');
  console.log(`running on localhost: ${port}`);
};

//GET route
// There should be a GET route setup on the server side with the first argument as a string naming the route,
//and the second argument a callback function to return the JS object created at the top of server code.
app.get('/trip/expectation', function sendData(reqBrowser, resServer) {
  // TODO: Pegar a info de cidade e data do query string da requisicao. Criar variaveis pra cada valor
  const location = reqBrowser.query.location;
  const date =  reqBrowser.query.date;
  console.log(`GET /trip/expectation?location=${location}&date=${date}`);

  weatherBitClient.getWeatherForecastAtCityByDate(location, '2020-10-30')
    .then((weatherInfo) => {
      const tripInfo = {...weatherInfo};
      tripInfo.locationPic = 'https://cdn.pixabay.com/photo/2020/06/08/20/58/nyc-5276112_150.jpg';

      resServer.send(tripInfo);
    })
    .catch((error) => {
      console.error(error);
      resServer.status(500).send(error);
    });
});
