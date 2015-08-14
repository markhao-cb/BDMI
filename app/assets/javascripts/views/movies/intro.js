BDMI.Views.Intro = Backbone.CompositeView.extend({
  template: JST['intro'],

  className: "intro-body group",

  initialize: function() {
    this.image = this.model._images.first();
    if(this.model._reviews !== undefined) {
        this.generateReviews();
      }
    this.listenTo(this.model, 'sync', this.render);
  },

  generateReviews: function() {
    this.hottestReview = this.newestReview = this.model._reviews.first();
    this.model._reviews.each(function(review) {
      if(review.attributes.updated_at > this.newestReview.attributes.updated_at) {
        this.newestReview = review;
      } else if(review.attributes.num_likes > this.hottestReview.attributes.num_likes) {
        this.hottestReview = review;
      }
    }.bind(this));
    this.addNewestReviewView(this.newestReview);
    this.addHottestReviewView(this.hottestReview);
  },

  addNewestReviewView: function(review) {
    var subview = new BDMI.Views.Review({ model: review });
    this.addSubview("#new-review",subview);
  },

  addHottestReviewView: function(review) {
    var subview = new BDMI.Views.Review({ model: review });
    this.addSubview("#hot-review",subview);
  },

  render: function() {
    var content = this.template({ movie: this.model, movie_image: this.image });
    this.$el.html(content);
    if(this.model._reviews === undefined) {
      var $noReview = $("<p>");
      $noReview.text('SORRY, NO REVIEW YET.').css('margin-top', '210').css('font-size', '36px');
      $("#review-section").append($noReview);
    } else {
      this.attachSubviews();
    }
    return this;
  }
});
