BDMI.Views.MovieReviews = Backbone.CompositeView.extend({
  template: JST['reviews/movie_reviews'],

  tagName: "section",

  className: "movie-reviews-item group",

  events: {

  },

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addReviewView);
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.each(this.addReviewView.bind(this));
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
  }
});
