BDMI.Views.MovieReviews = Backbone.CompositeView.extend({
  template: JST['reviews/movie_reviews'],

  tagName: "section",

  className: "movie-reviews-item group",

  events: {
    "click .review-button": "newReview"
  },

  initialize: function(options) {
    this.listenTo(this.collection, 'add', this.addReviewView);
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.each(this.addReviewView.bind(this));
    this.movie = options.movie;
  },

  addReviewView: function(review) {
    var subview = new BDMI.Views.Review({ model: review });
    this.addSubview('.review-list', subview);
  },

  render: function() {
    var content = this.template({ reviews: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  newReview: function(event) {
    var review = new BDMI.Models.Review();
    modal = new BDMI.Views.ReviewForm({
      model: review,
      collection: this.collection,
      movie: this.movie
    });
    $('body').prepend(modal.$el);
    modal.render();
    modal.$el.addClass('animated fadeIn');
  }
});
