BDMI.Models.IntroMovie = Backbone.Model.extend({
  urlRoot: "/api/intro_movies_index",

  parse: function(payload) {
    if(payload.images) {
      this.images().set(payload.images);
      delete payload.toys;
    }
    if(payload.reviews) {
      this.reviews().set(payload.reviews);
      delete payload.toys;
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
    if(this.reviews === undefined) {
      this.reviews = new BDMI.Collections.Reviews();
    }
    return this.reviews;
  }
});
