### CITY FACTS GAME
### Description
This is an interactive web application that basically allows the user to input a city and gets the following information from it:
1. Some facts about the city. ie country the city it is found, area, population size, the side of the road people drive on etc. This is derived from RESTCountries API(https://restcountries.com/v3.1/capital/${city}) which unfortunately only gives 
data for capital cities.

2. The weather information and a forecast for 3 days. Also there is an exciting interpretation/feel of the temperature of that place brought by color changes in all the elements of the webpage! ie blue for cold, green-yellow for warm and Red for hot places. This weather information is from the (https://goweather.herokuapp.com/weather/${city}) API, which excitingly, does not only have weather data for capital cities, but basically so many other cities and towns. 


3. An image of/from that particular place; information am consuming from (https://source.unsplash.com/1600x900/?${city})

### Setup/Installation Requirements
You need to have visual studio code installed.
Clone the repository
Go Live.

### Ideal Test Cases
I recommend testing data for any capital cities. eg London/Washingtondc for cold places, 
Nairobi/Kampala for warm/moderate places, and bangkok/juba for hot places..
other cities or towns will still give you their weather and sometimes images but not their facts since the API only consists of data of capital cities.

### Known Bugs
There is a CORs policy issue affecting the (https://goweather.herokuapp.com/weather/${city}) API. I recommend a user to install the Allow CORS extension and turn it off in their browser to help in countering the blocking of the request. 

For google chrome users for example, here is the the link to the Allow CORS extension. https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf

### Technologies Used
HTML
CSS
Javascript

### Support and contact details
Email : manassses.gikwa@student.moringaschool.com

### License
Apache License 2.0 

Copyright (c) [2023] [Manasses Gikwa]