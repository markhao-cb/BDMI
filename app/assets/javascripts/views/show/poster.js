BDMI.Views.Poster = Backbone.View.extend({
  template: JST['show/poster'],

  className: "movie-disc",

  events: {
    "click":"playTrailer"
    // "mouseover .movie-avatar": "handleMouseover",
    // "mouseleave.movie-avatar": "handleMouseleave"
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
      success: function(collection) {
        if (collection.length === 0) {
          this.flashAlert(["Sorry, trailer is not available."]);
        }
      }.bind(this)
    });
    var trailerView = new BDMI.Views.TrailerView({ model: trailer });
    $("body").append(trailerView.render().$el);
  },

  handleMouseover: function(event) {
    var $notice = $("<div><i class='fa fa-youtube-play'></i></div>");
    $notice.addClass('trailer-notice').addClass('animated fadeIn');
    $("body").append($notice);
  },

  handleMouseleave: function(event) {
    $(".trailer-notice").removeClass('fadeIn');
    $(".trailer-notice").addClass('fadeOut');
    $(".trailer-notice").one("webkitAnimationEnd", function() {
      $(".trailer-notice").remove();
    });
  },

  flashAlert: function(messages) {
    var alertView = new BDMI.Views.AlertView({
      messages: messages
    });
    $('body').append(alertView.$el);
    alertView.render();
    alertView.$(".alert").addClass('animated fadeIn');
    setTimeout(function() {
      alertView.$(".alert").removeClass('fadeIn');
      alertView.$(".alert").addClass('fadeOut');
      alertView.$(".alert").one("webkitAnimationEnd", function() {
        alertView.remove();
        $(".player").remove();
      });
    },3000);
  }
});
