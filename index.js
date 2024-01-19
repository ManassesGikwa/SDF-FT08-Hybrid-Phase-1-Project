// Declare weatherData globally
let weatherData;

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Fetch data for Nairobi when the page loads
    fetchData('Nairobi');

    // Add event listener to the form 
    const form = document.getElementById('cityForm');
    form.addEventListener('submit', function (event) {
        // Prevent default form behavior
        event.preventDefault();
        const cityInput = document.getElementById('cityInput').value;
        fetchData(cityInput);
    });

    // Add event listener to the search icon
    const searchIcon = document.getElementById('searchIcon');
    searchIcon.addEventListener('click', function (event) {
        // Prevent default click behavior
        event.preventDefault();
        const cityInput = document.getElementById('cityInput').value;
        fetchData(cityInput);
    });

});

// Add event listeners for hover on left-pane, cityimage
const leftPane = document.getElementById('left-pane');
const cityImage = document.getElementById('cityImage');

leftPane.addEventListener('mouseover', function () {
    // Check if weatherData is defined before trying to access its properties
    if (weatherData && weatherData.temperature) {
        leftPane.style.borderColor = getTemperatureColor(weatherData.temperature);
    }
});

leftPane.addEventListener('mouseout', function () {
    leftPane.style.borderColor = ''; // Resets to default color
});

cityImage.addEventListener('mouseover', function () {
    // Check if weatherData is defined before trying to access its properties
    if (weatherData && weatherData.temperature) {
        cityImage.querySelector('img').style.borderColor = getTemperatureColor(weatherData.temperature);
    }
});

// Event listener for the image border
cityImage.addEventListener('mouseout', function () {
    cityImage.querySelector('img').style.borderColor = '';
});

// Event listener for heading
const heading = document.getElementById('heading');
heading.addEventListener('mouseover', function () {
    if (weatherData && weatherData.temperature) {
        heading.style.color = getTemperatureColor(weatherData.temperature);
    }
});

heading.addEventListener('mouseout', function () {
    heading.style.color = ''; // Reset to default color
});

// Event listeners for navbar icons
const navbarIcons = document.querySelectorAll('.navbar a');

navbarIcons.forEach(icon => {
    icon.addEventListener('mouseover', function () {
        if (weatherData && weatherData.temperature) {
            icon.classList.add('temperature-color');
            icon.style.color = getTemperatureColor(weatherData.temperature);
        }
    });

    icon.addEventListener('mouseout', function () {
        icon.classList.remove('temperature-color');
        icon.style.color = '';
    });
});

// Event listeners for footer icons
const footerIcons = document.querySelectorAll('.icons a');

footerIcons.forEach(icon => {
    icon.addEventListener('mouseover', function () {
        if (weatherData && weatherData.temperature) {
            icon.classList.add('temperature-color');
            icon.style.color = getTemperatureColor(weatherData.temperature);
        }
    });

    icon.addEventListener('mouseout', function () {
        icon.classList.remove('temperature-color');
        icon.style.color = '';
    });
});

// Event listeners for other footer items
const footerItems2 = document.querySelectorAll('.icons p');

footerItems2.forEach(icon => {
    icon.addEventListener('mouseover', function () {
        if (weatherData && weatherData.temperature) {
            icon.classList.add('temperature-color');
            icon.style.color = getTemperatureColor(weatherData.temperature);
        }
    });

    icon.addEventListener('mouseout', function () {
        icon.classList.remove('temperature-color');
        icon.style.color = '';
    });
});

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to set background color based on the temperature
function getTemperatureColor(temperature) {
    temperature = parseFloat(temperature);
    let backgroundColor;
    // Determine background color based on temperature
    if (temperature < 10) {
        backgroundColor = 'aqua';
    } else if (temperature >= 10 && temperature < 22) {
        backgroundColor = 'greenyellow';
    } else if (temperature >= 22 && temperature < 28) {
        backgroundColor = 'orange';
    } else {
        backgroundColor = 'red';
    }
    return backgroundColor;
}

// Function to fetch weather data and city image
function fetchData(city) {
    // Fetch weather data
    fetch(`https://goweather.herokuapp.com/weather/${city}`)
        .then(response => response.json())
        .then(data => {
            weatherData = data; // Update the global variable
            console.log('Received weather data:', weatherData);

            // Fetch city image
            return fetch(`https://source.unsplash.com/1600x900/?${city}`);
        })
        .then(imageResponse => imageResponse.url)
        .then(imageUrl => {
            // Display weather information
            displayWeather(city, weatherData);

            // Display city image
            displayCityImage(imageUrl);

            // Fetch country information
            return fetch(`https://restcountries.com/v3.1/capital/${city}`)
                .then(response => response.json())
                .then(countryData => {
                    // Display country information
                    displayCountryInfo(countryData);
                });
        })
        .then(() => {
            // Display weather information
            displayWeather(city, weatherData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // If there's an error, still try to display the city name
            displayWeather(String(city), null);
        });
}

// Function to display weather information
function displayWeather(city, weatherData) {
    // Identifying various elements in the HTML
    const weatherInfo = document.getElementById('weatherInfo');
    const cityImage = document.getElementById('cityImage');
    const cityInput = document.getElementById('cityInput');
    const searchIcon = document.getElementById('searchIcon');

    // Check if weatherData is defined and has the expected properties
    if (weatherData && weatherData.temperature && weatherData.wind && weatherData.description && weatherData.forecast) {
        // Apply background color to weatherInfo
        const borderColor = getTemperatureColor(weatherData.temperature);
        weatherInfo.style.backgroundColor = borderColor;
        // Update border color to weatherInfo
        weatherInfo.style.borderColor = borderColor;
        // Update cityImage border color based on temperature
        cityImage.style.borderColor = borderColor;
        // Update form input border color based on temperature
        cityInput.style.borderColor = borderColor;
        // Update search icon color based on temperature
        searchIcon.style.color = borderColor;

        // Capitalize the first letter of the city
        const capitalizedCity = capitalizeFirstLetter(city);

        // Append weather data to our web page
        weatherInfo.innerHTML = `
            <h2>${capitalizedCity}'s weather today!</h2>
            <p> Temperature:${weatherData.temperature}</p>
            <p>Wind Speed: ${weatherData.wind}</p>
            <p>Description: ${weatherData.description}</p>
            <h3>3-Day Forecast:</h3>
            <ul>
                ${weatherData.forecast.map(day => `<li>Day ${day.day}: ${day.temperature}, Wind: ${day.wind}</li>`).join('')}
            </ul>
        `;
    } else {
        // Handle the case where data is not as expected
        weatherInfo.innerHTML = `<p>Unable to fetch weather data for ${city}.</p>`;
    }
}

// Function to display city image
function displayCityImage(imageUrl) {
    const cityImage = document.getElementById('cityImage');
    cityImage.innerHTML = `<img src="${imageUrl}" alt="City Image">`;
}

// Function to display country information
function displayCountryInfo(countryData) {
    const countryInfo = document.getElementById('countryInfo');

    if (countryData.length > 0) {
        const country = countryData[0];
        const timezone = country.timezones && country.timezones.length > 0 ? country.timezones[0] : 'Unknown';
        // Appending various country info elements to the HTML
        countryInfo.innerHTML = `
            <h2>City Information</h2>
            <p><span>Country</span>: ${country.name.common}</p>
            <p><span>Official Name</span>: ${country.name.official}</p>
            <div class="flagcontainer">
                <p><span>Flag</span></p>
                <img id="flag" src="${country.flags.png}" alt="Flag">
            </div>  
            <p><span>Area in sqrkm</span>: ${country.area}</p>
            <p><span>Population</span>: ${country.population}</p>
            <p><span>We drive on the</span> ${country.car.side} side</p>
            <p><span>Start of the Week</span>: ${country.startOfWeek}</p>
            <p><span>Current Timezone</span>: ${timezone}</p>
        `;
    } else {
        countryInfo.innerHTML = `<p> ${city}'s information is currently not available or is not a capital city".</p>`;
    }
}
