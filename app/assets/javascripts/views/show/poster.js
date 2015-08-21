BDMI.Views.Poster = Backbone.View.extend({
  template: JST['show/poster'],

  className: "movie-disc",

  events: {
    "click":"playTrailer"
  },

  initialize: function(options) {
    this.movie_id = options.movie_id;
  },

  render: function() {
    var content = this.template({ poster: this.model });
    this.$el.html(content);
    return this;
  },

  playTrailer: function(event) {
    var trailer = new BDMI.Models.Trailer();
    trailer.fetch({
      data:{
        movie_id: this.movie_id
      },
      processData: true,
      success: function(model) {
        debugger
      }
    });
    var trailerView = new BDMI.Views.TrailerView({ model: trailer });
    $("body").append(trailerView.render().$el);
  }
});
