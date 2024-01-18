// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Fetch data for Nairobi when the page loads
  fetchData('Nairobi');

  // Add event listener to the form
  const form = document.getElementById('cityForm');
  form.addEventListener('submit', function (event) {
    //Prevent default form behavior
      event.preventDefault();
      const cityInput = document.getElementById('cityInput').value;
      fetchData(cityInput);
  });
});

// Function to fetch weather data and city image
function fetchData(city) {
  // Fetch weather data
  fetch(`https://goweather.herokuapp.com/weather/${city}`)
      .then(response => response.json())
      .then(weatherData => {
        console.log('Received weather data:', weatherData); // Log the received data

          // Fetch city image
          return fetch(`https://source.unsplash.com/1600x900/?${city}`)
              .then(imageResponse => imageResponse.url)
              .then(imageUrl => {
                  // Display weather information
                  displayWeather(city, weatherData);  

                  // Display city image
                  displayCityImage(imageUrl);
                  
                  // Fetch country information
                  return fetch(`https://restcountries.com/v3.1/capital/${city}`);
              })
              .then(response => response.json())
              .then(countryData => {
                  // Display country information
                  displayCountryInfo(countryData);
            
              });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          // If there's an error, still try to display the city name
          displayWeather(String(city), null);
      });
}

// Function to display weather information
function displayWeather(city, weatherData) {
  const weatherInfo = document.getElementById('weatherInfo');
   // Check if weatherData is defined and has the expected properties
   if (weatherData && weatherData.temperature && weatherData.wind && weatherData.description && weatherData.forecast) {
  weatherInfo.innerHTML = `
      <h2>Here is the weather info for ${city}</h2>
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
      countryInfo.innerHTML = '<p>Country information not available.</p>';
  }
}