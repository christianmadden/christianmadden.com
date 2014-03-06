
"use strict";

require.config
({
    shim:
    {
        underscore: { exports: "_" },
        backbone:
        {
          deps: ["underscore", "jquery"],
          exports: "Backbone"
        },
        handlebars: { exports: "Handlebars" }
    },
    paths:
    {
      jquery: "../bower_components/jquery/jquery",
      backbone: "../bower_components/backbone/backbone",
      underscore: "../bower_components/underscore/underscore",
      handlebars: "../bower_components/handlebars/handlebars",
      hbs: "../bower_components/require-handlebars-plugin/hbs"
    }
});

require(["backbone", "routes/router"],
function (Backbone, router)
{
  Backbone.history.start();
});
