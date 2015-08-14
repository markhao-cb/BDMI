BDMI.Models.InTheatersMovie = Backbone.Model.extend({
  urlRoot: "/api/in_theaters_movies",

  parse: function(payload) {
    if(payload.images) {
      this.images().set(payload.images);
      delete payload.images;
    }
    if(payload.reviews) {
      this.reviews().set(payload.reviews);
      delete payload.reviews;
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
  }
});
