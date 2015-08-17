BDMI.Views.MovieReviews = Backbone.CompositeView.extend({
  template: JST['reviews/movie_reviews'],

  tagName: "section",

  className: "movie-reviews-item group",

  events: {
    "click .review-button": "newReview",
    "click #load-more-button": "loadMore"
  },

  initialize: function(options) {
    this.page = 1;
    this.hadMore = true;
    this.movie = options.movie;
    this.fetchReview();
    this.listenTo(this.collection, 'add', this.addReviewView);
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.each(this.addReviewView.bind(this));
  },

  addReviewView: function(review) {
    var subview = new BDMI.Views.Review({ model: review });
    this.addSubview('.review-list', subview);
  },

  render: function() {
    var content = this.template({
      reviews: this.collection,
      hasMore: this.hasMore
    });
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
  },

  loadMore: function(event) {
    this.page += 1;
    this.fetchReview();
  },

  fetchReview: function() {
    this.collection.fetch({
      data: {
        page: this.page,
        movie_id: this.movie.id
      },
      processData: true,
      success: function(resp) {
        if (resp.length < 4) {
          alert("No more reviews.");
          // this.flashAlert();
        }
      },
      error: function(a,b,c) {
        debugger
      }
    });
  },

  flashAlert: function() {
    var alertView = new BDMI.Views.AlertView({ alertType: "no_more" });
    $('body').append(alertView.$el);
    alertView.render();
    alertView.$el.addClass('animated fadeIn');
    var myTimeout = setTimeout(function() {
      alertView.$el.removeClass('fadeIn');
      alertView.$el.addClass('fadeOut');
      clearTimeout(myTimeout);
    }, 3000);
    alertView.$el.one("webkitTransitionEnd", function() {
      alertView.$el.remove();
    });
  }
});
