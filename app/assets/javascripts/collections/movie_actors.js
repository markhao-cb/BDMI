BDMI.Collections.MovieActors = Backbone.Collection.extend({
  url: "/api/actors",
  model: BDMI.Models.MovieActor
});
