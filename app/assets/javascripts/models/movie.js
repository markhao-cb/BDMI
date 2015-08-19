BDMI.Models.Movie = Backbone.Model.extend({
  urlRoot: "/api/movies",

  parse: function(payload) {
    if(payload.images) {
      this.images().set(payload.images);
      delete payload.images;
    }
    if(payload.reviews) {
      this.reviews().set(payload.reviews);
      delete payload.reviews;
    }
    if(payload.posters) {
      this.posters().set(payload.posters);
      delete payload.posters;
    }
    if(payload.actors) {
      this.actors().set(payload.actors);
      delete payload.actors;
    }

    if(payload.genres) {
      this.genres().set(payload.genres);
      delete payload.genres;
    }

    return payload;
  },

  images: function() {
    if(this._images === undefined) {
      this._images = new BDMI.Collections.MovieImages();
    }
    return this._images;
  },

  reviews: function() {
    if(this._reviews === undefined) {
      this._reviews = new BDMI.Collections.Reviews();
    }
    return this._reviews;
  },

  posters: function() {
    if(this._posters === undefined) {
      this._posters = new BDMI.Collections.MoviePosters();
    }
    return this._posters;
  },

  actors: function() {
    if(this._actors === undefined) {
      this._actors = new BDMI.Collections.MovieActors();
    }
    return this._actors;
  },

  genres: function() {
    if(this._genres === undefined) {
      this._genres = new BDMI.Collections.MovieGenres();
    }
    return this._genres;
  }
});
