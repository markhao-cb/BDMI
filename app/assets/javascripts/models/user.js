BDMI.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  parse: function(payload) {
    if (payload.reviews) {
      this.reviews().set(payload.reviews);
      delete payload.reviews;
    }

    if (payload.watched_movies) {
      this.watchedMovies().set(payload.watched_movies);
      delete payload.watched_movies;
    }

    if (payload.wanted_movies) {
      this.wantedMovies().set(payload.wanted_movies);
      delete payload.wanted_movies;
    }
    return payload;
  },

  reviews: function() {
    if (this._reviews === undefined) {
      this._reviews = new BDMI.Collections.Reviews();
    }
    return this._reviews;
  },

  watchedMovies: function() {
    if(this._watchedMovies === undefined) {
      this._watchedMovies = new BDMI.Collections.InTheatersMovies();
    }
    return this._watchedMovies;
  },

  wantedMovies: function() {
    if(this._wantedMovies === undefined) {
      this._wantedMovies = new BDMI.Collections.InTheatersMovies();
    }
    return this._wantedMovies;
  },
});
