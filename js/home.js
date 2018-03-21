'use strict';

var home = home || {};

function init()
{
    console.log("Home: Init...");
}

$(function()
{
  if($('body').attr('id') === 'home')
  {
    console.log('Loading: Home');
    home.init();
  }
});
