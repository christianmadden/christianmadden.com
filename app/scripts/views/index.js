
define(["jquery", "underscore", "backbone", "handlebars", "hbs!../templates/index"],
function($, _, Backbone, Handlebars, tpl)
{
  "use strict";

  var IndexView = Backbone.View.extend
  ({
    el: "#projects",
    template: tpl({}),
    initialize: function(data)
    {
      this.data = data;
      this.render();
    },
    render: function()
    {
      $(this.el).html(this.template)
    }
  });

  return IndexView;
});
