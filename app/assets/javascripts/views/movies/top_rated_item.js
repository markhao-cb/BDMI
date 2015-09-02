BDMI.Views.TopRatedItem = Backbone.CompositeView.extend({
  template: JST['movie/in_theaters_item'],

  className: "top_rated_item",

  events: {
    "click .small_image":"handleClick",
    "mouseenter .small_image": "handleEnter",
    "mouseleave .small_image": "handleLeave"
  },

  initialize: function() {
    this.listenTo(this.model, 'sync change', this.render);
  },

  render: function() {
    var poster_url = this.model.posters().sample().attributes.poster_url.slice(0,48)+
    "/c_lpad,w_180"+this.model.posters().sample().attributes.poster_url.slice(48);
    var content = this.template({ movie: this.model, poster_url: poster_url });
    this.$el.html(content);
    this.generateStars();
    return this;
  },

  handleClick: function(event) {
    this.$el.addClass('animated flipOutX');
    this.$el.one('webkitAnimationEnd', function() {
      this.movieShow();
      this.render();
    }.bind(this));
  },

  movieShow: function() {
    window.scrollTo(0, 0);
    Backbone.history.navigate("movies/"+this.model.id, { trigger: true });
  },

  handleEnter: function(event) {
    $(event.currentTarget).addClass('animated infinite pulse');
  },

  handleLeave: function(event) {
    $(event.currentTarget).removeClass('animated infinite pulse');
  },


  generateStars: function() {
        this.$('.small_movie_score').empty();
        var grade = Math.floor(this.model.attributes.vote_average / 2);
        var star = Math.max(0, (Math.min(5, grade)));
        var blank = 5 - star;
        while (star > 0) {
          var $star = $("<span></span>");
          $star.css('color', 'orange');
          $star.text("★");
          this.$('.small_movie_score').append($star);
          star--;
        }
        while (blank > 0) {
          var $blank = $("<span></span>");
          $blank.text("☆");
          this.$('.small_movie_score').append($blank);
          blank--;
        }
      }
});
