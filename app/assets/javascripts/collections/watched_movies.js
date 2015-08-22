BDMI.Collections.WatchedMovies = Backbone.Collection.extend({
  url: "/api/watcheds",
  model: BDMI.Models.WatchedMovie
});
