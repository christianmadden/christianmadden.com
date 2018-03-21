'use strict';

var chronometer = chronometer || {};

chronometer.conditions = (function()
{
  var conditionsData = { weather: null, astronomy: null };
  var moonChar;
  var ASCIIforA = 97;

  return {

    init: function()
    {
      console.log('Init chronometer.conditions...');
    },
    update: function()
    {
      chronometer.conditions.updateWeather();
      chronometer.conditions.updateAstronomy();
    },
    updateWeather: function()
    {
      $.ajax
      ({
        url: 'http://api.wunderground.com/api/f9f3d189b068e9f1/conditions/q/MA/Beverly.json?callback=?',
        dataType: 'jsonp',
        localCache: true,
        cacheTTL: 2,
        cacheKey: 'ajax.chronometer.weather',
        success: function(data)
        {
          /*jshint camelcase: false */

          var temp = data.current_observation.temp_f;
          var weather = data.current_observation.weather.toLowerCase();
          var wind = data.current_observation.wind_string.toLowerCase();
          conditionsData.weather = { temp: temp, weather: weather, wind: wind };

          chronometer.conditions.displayWeather();
        }
      });
    },
    displayWeather: function()
    {
      //console.log('Display WEATHER');
    },
    updateAstronomy: function()
    {
      $.ajax
      ({
        url: 'http://api.wunderground.com/api/f9f3d189b068e9f1/astronomy/q/MA/Beverly.json?callback=?',
        dataType: 'jsonp',
        localCache: true,
        cacheTTL: 2,
        cacheKey: 'ajax.chronometer.astronomy',
        success: function(data)
        {
          /*jshint camelcase: false */

          var moonAge = parseInt(data.moon_phase.ageOfMoon);
          var moonChar =  String.fromCharCode(ASCIIforA + moonAge);
          var sunrise = new Date();
          sunrise.setHours(data.sun_phase.sunrise.hour);
          sunrise.setMinutes(data.sun_phase.sunrise.minute);
          var sunset = new Date();
          sunset.setHours(data.sun_phase.sunset.hour);
          sunset.setMinutes(data.sun_phase.sunset.minute);
          conditionsData.astronomy = { moon: { age: moonAge, char: moonChar }, sun: { sunrise: sunrise, sunset: sunset } };

          chronometer.conditions.displayAstronomy();
        }
      });
    },
    displayAstronomy: function()
    {
      chronometer.conditions.displaySun();
      chronometer.conditions.displayMoon();
    },
    displaySun: function()
    {

    },
    displayMoon: function()
    {
      // Only update the moon if it hasn't been updated yet or if it changes
      if(!moonChar || moonChar !== conditionsData.astronomy.moon.char)
      {
        moonChar = conditionsData.astronomy.moon.char;
        $('#moon p').text(moonChar);
      }
    }
  };
})();
