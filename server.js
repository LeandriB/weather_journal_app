// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
// Callback to debug
function listening() {
    console.log('server is running')
    console.log(`running on localhost: ${port}`);
}

//GET route returning projectData
app.get('/all', getData);

function getData(request, response) {
    response.send(projectData);
    console.log('GET request received');
}

//POST route adds data to projectData
app.post('/add', addData);

function addData(request, response) {
    projectData['temperature'] = request.body['temperature'];
    projectData['date'] = request.body['date'];
    projectData['content'] = request.body['content'];

    response.send(projectData);

}