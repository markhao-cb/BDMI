BDMI.Views.MovieReviews = Backbone.CompositeView.extend({
  template: JST['reviews/movie_reviews'],

  tagName: "section",

  className: "movie-reviews-item group",

  events: {
    "click .review-button": "newReview",
    "hover #load-more-reviews": "handleHover",
    "click #load-more-reviews": "loadMore"
  },

  initialize: function(options) {
    this.page = 1;
    this.fromFetch = true;
    this.movie = options.movie;
    this.fetchReview();
    this.listenTo(this.collection, 'add', this.addReviewView);
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.each(this.addReviewView.bind(this));
  },

  addReviewView: function(review) {
    var subview = new BDMI.Views.Review({ model: review });
    if(this.fromFetch) {
      this.addSubview('.review-list', subview);
    } else {
      this.addSubview('.review-list', subview, true);
      this.fromFetch = true;
    }
  },

  render: function() {
    var content = this.template({
      reviews: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },

  onRender: function() {
  },

  newReview: function(event) {
    if (BDMI.CURRENT_USER !== undefined) {
      var review = new BDMI.Models.Review();
      modal = new BDMI.Views.ReviewForm({
        model: review,
        collection: this.collection,
        movie: this.movie,
        mainView: this
      });
      $('body').prepend(modal.$el);
      modal.render();
      modal.$el.addClass('animated fadeIn');
    } else {
      this.flashAlert(["Please login before writing reviews."]);
    }
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
      remove:false,
      success: function(resp) {
        if (resp.length < 4 && this.page != 1) {
          this.flashAlert(["No more reviews!"]);
          this.page -= 1;
        }
      }.bind(this)
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
      });
    },2000);
  }
});
