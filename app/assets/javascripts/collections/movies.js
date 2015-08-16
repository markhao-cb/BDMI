BDMI.Collections.Movies = Backbone.Collection.extend({
  url: "/api/movies",

  model: BDMI.Models.Movie,

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
