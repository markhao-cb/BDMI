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
    if(payload.posts) {
      this.posts().set(payload.posts);
      delete payload.posts;
    }
    if(payload.actors) {
      this.actors().set(payload.actors);
      delete payload.actors;
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

  posts: function() {
    if(this._posts === undefined) {
      this._posts = new BDMI.Collections.MoviePosts();
    }
    return this._posts;
  },

  actors: function() {
    if(this._actors === undefined) {
      this._actors = new BDMI.Collections.MoviePosts();
    }
    return this._actors;
  }
});
