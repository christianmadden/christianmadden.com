'use strict';

var chronometer = function()
{
  var EST_TZ_OFFSET = -5;

  return {

    DEBUG: false,
    init: function()
    {
      console.log('Init chronometer...');
    },
    localNow: function()
    {
      var now = new Date();
      var localOffset = -(now.getTimezoneOffset() / 60);
      var offset = EST_TZ_OFFSET - localOffset;
      var localNow = new Date(new Date().getTime() + offset * 3600 * 1000);
      return localNow;
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
      $('#spinner').css({ transform: 'rotateZ(' + (s * 6) + 'deg)' });

      // Show the filler if we're under 30s, the mask if we're over
      if(s <= 30)
      {
        $('#mask').css('opacity', '1.0');
        $('#filler').css('opacity', '0.0');
      }
      else
      {
        $('#filler').css('opacity', '1.0');
        $('#mask').css('opacity', '0.0');
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
      $('#minute-dial').css({ transform: 'rotateZ(' + ((((m * 60) + s) / 60) * 6) + 'deg)' });
    },
    updateHourDial: function(h, m)
    {
      // Adjust for 12-hour time
      if(h > 12){ h = h - 12; }
      // Rotate the hour dial 30 degrees per hour, clockwise
      // Include fractional minutes
      $('#hour-dial').css({ transform: 'rotateZ(' + ((((h * 60) + m) / 60) * 30) + 'deg)' });
    },
    updateAstroDial: function(h)
    {
      // Rotate the astro dial 15 degrees per hour, counter-clockwise (sun rises in the east)
      $('#astro-dial').css({ transform: 'rotateZ(' + -(h * 15) + 'deg)' });
    },
    updateSkyAndSea: function(h)
    {
      var sky = Math.floor(h);
      var blendedSky = sky - 1;
      if(blendedSky === 24){ blendedSky = 0; }

      // What's the opacity of the blended sky?
      var blendedSkyOpacity = (h % 1);

      // Set primary sky
      $('#sky').removeClass().addClass('sky-' + sky).css({ opacity: blendedSkyOpacity });
      $('#sea').removeClass().addClass('sea-' + sky).css({ opacity: blendedSkyOpacity });

      // Set blended sky
      $('#sky-blend').removeClass().addClass('sky-' + blendedSky);
      $('#sea-blend').removeClass().addClass('sea-' + blendedSky);
    }
  };

}();
