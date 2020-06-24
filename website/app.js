/* Global Variables */
// Base URL and API key
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey ='&APPID=2549a3de026cf6e362be843b98d97872&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add click function to existing DOM element
document.getElementById('generate').addEventListener('click', performAction);

// Function callback for event listener
function performAction(event) {
    // User input data
    const userZip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    getWeatherData(baseURL, apiKey, userZip)
    .then(function(data) {
        let date = new Date(data.dt * 1000)
        let dateString = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        // Add data to POST request
        postWeatherData('/add', {temperature: data.main.temp, date: dateString, content: content});
        // Update the UI dynamically
        updateUI('/all');
    });
}

// Function to GET web API data
const getWeatherData = async(baseURL, apiKey, userZip) => {
    const response  = await fetch(baseURL + userZip + apiKey);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
};

// Function to POST data
const postWeatherData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    } catch(error) {
        console.log('error', error)
    };
};

// Function for updating the UI
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temperature').innerHTML = allData.temperature + "&deg;F";
        document.getElementById('content').innerHTML = allData.content;
    } catch(error) {
        console.log('error', error);
    }
};