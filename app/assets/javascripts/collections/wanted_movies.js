BDMI.Collections.WantedMovies = Backbone.Collection.extend({
  url: "/api/wanteds",
  model: BDMI.Models.WantedMovie
});
