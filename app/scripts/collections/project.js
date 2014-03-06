
define
([
    "underscore",
    "backbone",
    "models/project"
],
function(_, Backbone, ProjectModel)
{
  "use strict";

  var ProjectCollection = Backbone.Collection.extend
   ({
      model: ProjectModel
  });

  return ProjectCollection;
});
