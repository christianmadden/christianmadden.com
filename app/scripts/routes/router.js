
define(["backbone", "../views/index", "../views/project"],
function(Backbone, IndexView, ProjectView)
{
  "use strict";

  var AppRouter = Backbone.Router.extend
  ({
    routes:
    {
      "": "index",
      "projects": "index",
      "projects/:slug": "project"
    },
    index: function()
    {
      console.log("Route >> Index");
      return new IndexView({});
    },
    project: function(slug)
    {
      console.log("Route >> Project: " + slug);
      return new ProjectView({ slug: slug });
    }
  });

  return new AppRouter();
});
