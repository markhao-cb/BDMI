BDMI.Views.InfoView = Backbone.CompositeView.extend({
  template: JST['show/info'],

  className: "movie-info",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.addPosterView();
  },

  render: function() {
    var content = this.template({ movie: this.model });
    this.$el.html(content);
    this.generateStars();
    this.attachSubviews();
    return this;
  },

  addPosterView: function() {
    var poster = this.model.posts().first();
    var subview = new BDMI.Views.Poster({ model: poster });
    this.addSubview(".movie-poster", subview);
  },

  generateStars: function() {
        this.$('.small-movie-star').empty();
        var grade = Math.floor(this.model.attributes.score / 2);
        var star = Math.max(0, (Math.min(5, grade)));
        var blank = 5 - star;
        while (star > 0) {
          var $star = $("<span></span>");
          $star.text("★");
          this.$('.small-movie-star').append($star);
          star--;
        }
        while (blank > 0) {
          var $blank = $("<span></span>");
          $blank.text("☆");
          this.$('.small-movie-star').append($blank);
          blank--;
        }
    }
});
