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
          // Fetch city image
          return fetch(`https://source.unsplash.com/1600x900/?${city}`)
              .then(imageResponse => imageResponse.url)
              .then(imageUrl => {
                  // Display weather information
                  displayWeather(weatherData);

                  // Display city image
                  displayCityImage(imageUrl);
              });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

// Function to display weather information
function displayWeather(weatherData) {
  const weatherInfo = document.getElementById('weath  erInfo');
  weatherInfo.innerHTML = `
      <h2> ${weatherData.temperature}</h2>
      <p>Wind: ${weatherData.wind}</p>
      <p>Description: ${weatherData.description}</p>
      <h3>3-Day Forecast:</h3>
      <ul>
          ${weatherData.forecast.map(day => `<li>${day.day}: ${day.temperature}, Wind: ${day.wind}</li>`).join('')}
      </ul>
  `;
}

// Function to display city image
function displayCityImage(imageUrl) {
  const cityImage = document.getElementById('cityImage');
  cityImage.innerHTML = `<img src="${imageUrl}" alt="City Image">`;
}

