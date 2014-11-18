
chronometer.conditions = function()
{

  var conditions_data = { weather: null, astronomy: null };
  var moon_char;
  var ASCII_a = 97;

  var privatefunction = function()
  {

  };

  return {

    init: function()
    {
      console.log("Init chronometer.conditions...");
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
        url: "http://api.wunderground.com/api/f9f3d189b068e9f1/conditions/q/MA/Beverly.json?callback=?",
        dataType: "jsonp",
        localCache: true,
        cacheTTL: 2,
        cacheKey: "ajax.chronometer.weather",
        success: function(data)
        {
          var temp = data.current_observation.temp_f;
          var weather = data.current_observation.weather.toLowerCase();
          var wind = data.current_observation.wind_string.toLowerCase();
          conditions_data.weather = { temp: temp, weather: weather, wind: wind };

          chronometer.conditions.displayWeather();
        }
      });
    },
    displayWeather: function()
    {
      //console.log("Display WEATHER");
    },
    updateAstronomy: function()
    {
      $.ajax
      ({
        url: "http://api.wunderground.com/api/f9f3d189b068e9f1/astronomy/q/MA/Beverly.json?callback=?",
        dataType: "jsonp",
        localCache: true,
        cacheTTL: 2,
        cacheKey: "ajax.chronometer.astronomy",
        success: function(data)
        {
          var moon_age = parseInt(data.moon_phase.ageOfMoon);
          var moon_char =  String.fromCharCode(ASCII_a + moon_age);
          var sunrise = new Date();
          sunrise.setHours(data.sun_phase.sunrise.hour);
          sunrise.setMinutes(data.sun_phase.sunrise.minute);
          var sunset = new Date();
          sunset.setHours(data.sun_phase.sunset.hour);
          sunset.setMinutes(data.sun_phase.sunset.minute);
          conditions_data.astronomy = { moon: { age: moon_age, char: moon_char }, sun: { sunrise: sunrise, sunset: sunset } };

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
      if(!moon_char || moon_char !== conditions_data.astronomy.moon.char)
      {
        moon_char = conditions_data.astronomy.moon.char;
        $("#moon p").text(moon_char);
      }
    }
  };
}();
