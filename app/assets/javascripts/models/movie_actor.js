BDMI.Models.MovieActor = Backbone.Model.extend({
  urlRoot: "/api/actors",

  parse: function(payload) {
    if(payload.images) {
      this.images().set(payload.images);
      delete payload.images;
    }

    if(payload.credits) {
      this.credits().set(payload.credits);
      delete payload.credits;
    }

    return payload;
  },

  images: function() {
    if(this._images === undefined) {
      this._images = new BDMI.Collections.MovieImages();
    }
    return this._images;
  },

  credits: function() {
    if(this._credits === undefined) {
      this._credits = new BDMI.Collections.Movies();
    }
    return this._credits;
  }
});
