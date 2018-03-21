'use strict';

var home = home || {};

$(function()
{

  $('a[rel=external]').attr('target', '_blank');

  $("#lock").click(function(){ home.toggleLock(); });

  if($('body').attr('id') === 'home')
  {
    console.log('Loading: home');
    home.init();
  }

});
