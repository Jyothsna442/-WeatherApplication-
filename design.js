const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".location");
const dateandTimeField = document.querySelector(".date_time");
const conditionField = document.querySelector(".condition_text");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener('submit', searchForLocation);

let target = "Lucknow";

const fetchResults = async (targetLocation) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=95bae3fd0e9e4fde87f153102251002&q=${targetLocation}&aqi=no`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);  // Debug: log the full data object

    // Extract data from API response
    const locationName = data.location.name;
    const localTime = data.location.localtime;  // Format: "YYYY-MM-DD HH:mm"
    const temp = data.current.temp_c;  // Temperature in Celsius
    const condition = data.current.condition.text;  // Weather condition (e.g., "Mist")

    // Update the weather details on the page
    updateDetails(temp, locationName, localTime, condition);
};

function updateDetails(temp, locationName, localTime, condition) {
    console.log(localTime);  // Debug: log time

    // Split the local time into date and time
    const [datePart, timePart] = localTime.split(" ");  // Split the date and time
    const [year, month, day] = datePart.split("-");  // Extract year, month, day
    const [hour, minute] = timePart.split(":");  // Extract hour and minute

    // Create a JavaScript Date object
    const dateObj = new Date(year, month - 1, day, hour, minute);  // Month is 0-indexed in JavaScript

    // Format the date and time
    const formattedDate = dateObj.toLocaleDateString("en-GB");  // Format: DD/MM/YYYY
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });  // Format: HH:mm
    const currentDay = getDayName(dateObj.getDay());  // Get day name from the Date object

    // Update the DOM elements with the data
    temperatureField.innerText = `${temp}°C`;  // Display temperature
    locationField.innerText = locationName;  // Display location
    dateandTimeField.innerText = `${formattedTime} - ${currentDay} ${formattedDate}`;  // Display time, day, and date
    conditionField.innerText = condition;  // Display weather condition
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}

fetchResults(target);

function getDayName(number) {
    switch (number) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        default: return "";
    }
}
