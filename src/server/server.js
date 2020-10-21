// //Geonames
// const apiKey =
// const baseURL =

// //Weatherbit
// const apiKey =
// const baseURL =

// //Pixabay
// const apiKey =
// const baseURL =




// Setup empty JS object to act as endpoint for all routes
const projectData = {
  tempEntry: []
};

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
app.use(express.static('website')); //pointed our app to the folder that we want them to look at.(connects our server-side code (server.js) to our client side code (website)folder)

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
app.get('/all', sendData);
function sendData(req, res) {
  res.send(projectData);
};

//POST route
//You should be able to add an entry to the project endpoint using a POST route setup on the server side
//and executed on the client side as an asynchronous function.
//The server side function should create a new entry in the apps endpoint (the named JS object) consisting
//of the data received from the client side POST.
app.post('/add', function addData(req, res) {
  const newEntry = {
    "date" : req.body.date,
    "temp" : req.body.temp,
    "feelings" : req.body.feelings,
  };
  projectData.tempEntry.push(newEntry);
  res.send(projectData.tempEntry);
});
