BDMI.Views.InTheatersItem = Backbone.CompositeView.extend({
  template: JST['movie/in_theaters_item'],

  className: "in_theaters_item",

  events: {
    "click .small_image":"handleClick",
    "hover":"handleHover",
    "mouseenter .small_image": "handleEnter",
    "mouseleave .small_image": "handleLeave"
  },

  initialize: function() {
    this.poster_url = this.model.posters().sample().attributes.poster_url;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ movie: this.model, poster_url: this.poster_url });
    this.$el.html(content);
    this.generateStars();
    // this.onRender();
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

  onRender: function() {
    this.$('#star').raty('destroy');
    var grade = this.model.attributes.vote_average / 2;
    this.$('#star').raty({
      starOff: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-off_j7trzb.png",
      starOn: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-on_iezcg6.png",
      starHalf: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-half_w79ezb.png",
      helf: true,
      score: grade,
      readOnly: true
    });
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
