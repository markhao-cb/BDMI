BDMI.Collections.TopRatedMovies = Backbone.Collection.extend({
  url: "/api/top_rated_movies",
  model: BDMI.Models.TopRatedMovie
});
