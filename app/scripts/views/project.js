
define(["jquery", "underscore", "backbone", "handlebars", "hbs!../templates/project"],
function($, _, Backbone, Handlebars, tpl)
{
  "use strict";

  var ProjectView = Backbone.View.extend
  ({
    el: "#projects",
    template: tpl,
    initialize: function(data)
    {
      this.data = data;
      this.render();
    },
    render: function()
    {
      $(this.el).html(this.template(this.data));
    }
  });

  return ProjectView;
});
