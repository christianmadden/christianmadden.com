
chronometer = function()
{
  var EST_TZ_OFFSET = -5;

  var privatefunction = function()
  {

  };

  return {

    DEBUG: false,
    init: function()
    {
      console.log("Init chronometer...");
    },
    localNow: function()
    {
      var now = new Date();
      var local_offset = -(now.getTimezoneOffset() / 60);
      var offset = EST_TZ_OFFSET - local_offset;
      var local_now = new Date(new Date().getTime() + offset * 3600 * 1000);
      return local_now;
    },
    update: function()
    {
      var t = chronometer.localNow();
      chronometer.updateSeconds(t);
      chronometer.updateHours(t);
    },
    updateSeconds: function(t)
    {
      chronometer.updateSecondsRing(t);
    },
    updateSecondsRing: function(t)
    {
      var s = t.getSeconds() + (t.getMilliseconds() / 1000);

      // Rotate the spinner 6 degrees per second
      $("#spinner").css({ transform: "rotateZ(" + (s * 6) + "deg)" });

      // Show the filler if we're under 30s, the mask if we're over
      if(s <= 30)
      {
        $("#mask").css("opacity", "1.0");
        $("#filler").css("opacity", "0.0");
      }
      else
      {
        $("#filler").css("opacity", "1.0");
        $("#mask").css("opacity", "0.0");
      }
    },
    updateHours: function(t)
    {
      // Get the hour of day
      var h = t.getHours();

      // DEBUG Make the hours pass like seconds...
      if(chronometer.DEBUG)
      {
        h = (t.getSeconds() + (t.getMilliseconds() / 1000)) / 2.5;
      }

      chronometer.updateMinuteDial(t.getMinutes(), t.getSeconds());
      chronometer.updateHourDial(h, t.getMinutes());
      chronometer.updateAstroDial(h);
      chronometer.updateSkyAndSea(h);
    },
    updateMinuteDial: function(m, s)
    {
      // Rotate the minute dial 6 degrees per minute, clockwise
      // Use the fractional seconds
      $("#minute-dial").css({ transform: "rotateZ(" + ((((m * 60) + s) / 60) * 6) + "deg)" });
    },
    updateHourDial: function(h, m)
    {
      // Adjust for 12-hour time
      if(h > 12){ h = h - 12; }
      // Rotate the hour dial 30 degrees per hour, clockwise
      // Include fractional minutes
      $("#hour-dial").css({ transform: "rotateZ(" + ((((h * 60) + m) / 60) * 30) + "deg)" });
    },
    updateAstroDial: function(h)
    {
      // Rotate the astro dial 15 degrees per hour, counter-clockwise (sun rises in the east)
      $("#astro-dial").css({ transform: "rotateZ(" + -(h * 15) + "deg)" });
    },
    updateSkyAndSea: function(h)
    {
      var sky = Math.floor(h);
      var blended_sky = sky - 1;
      if(blended_sky === 24){ blended_sky = 0; }

      // What's the opacity of the blended sky?
      var blended_sky_opacity = (h % 1);

      // Set primary sky
      $("#sky").removeClass().addClass("sky-" + sky).css({ opacity: blended_sky_opacity });
      $("#sea").removeClass().addClass("sea-" + sky).css({ opacity: blended_sky_opacity });

      // Set blended sky
      $("#sky-blend").removeClass().addClass("sky-" + blended_sky);
      $("#sea-blend").removeClass().addClass("sea-" + blended_sky);
    }
  };

}();
