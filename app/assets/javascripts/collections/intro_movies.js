BDMI.Collections.IntroMovies = Backbone.Collection.extend({
  url: "/api/intro_movie_index",
  model: BDMI.Models.IntroMovie,

  getOrFetch: function(id) {
    var movie = this.get(id);
    if (!movie) {
      movie = new BDMI.Models.Movie({ id:id });
      this.add(movie);
      var movies = this;
      movie.fetch({
        error: function() {
          movies.remove(movie);
        }
      });
    } else {
      movie.fetch();
    }
    return movie;
  }
});
