'use strict';

// TODO
// REALLY SMART CACHING!
// - weather: 1 hour?
// - sunrise/sunset: once per calendar day
// Use realistic sunrise/sunset times
// Weather:
// - Temp
// - Rain
// - Snow
// - Wind
// - Clouds
// - Lightning
// What text to display?
// Change ocen color over time

var chronometer = chronometer || {};

function draw()
{
    requestAnimationFrame(draw);
    chronometer.update();
    //chronometer.conditions.update();
}

$(function()
{
  if($('body').attr('id') === 'home')
  {
    console.log('Loading: home');
    chronometer.init();
    chronometer.conditions.init();

    draw();
  }

});
