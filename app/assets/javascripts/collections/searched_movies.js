BDMI.Collections.SearchedMovies = Backbone.Collection.extend({
  url: "/api/search_results",
  model: BDMI.Models.SearchedMovie
});
