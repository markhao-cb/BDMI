BDMI.Collections.InTheatersMovies = Backbone.Collection.extend({
  url: "/api/in_theaters_movies",
  model: BDMI.Models.InTheatersMovie
});
