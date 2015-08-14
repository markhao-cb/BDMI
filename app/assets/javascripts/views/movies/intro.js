BDMI.Views.Intro = Backbone.CompositeView.extend({
  template: JST['intro'],

  className: "intro-body",

  initialize: function() {
    this.image = this.model._images.first();
    this.hottestReview = this.newestReview = this.model._reviews.first();
    this.model._reviews.each(function(review) {
      if(review.attributes.updated_at > this.newestReview.attributes.updated_at) {
        this.newestReview = review;
      } else if(review.attributes.num_likes > this.hottestReview.attributes.num_likes) {
        this.hottestReview = review;
      }
    }.bind(this));
    this.addReviewView({ newestReview:this.newestReview, hottestReview:this.hottestReview});
    this.listenTo(this.model, 'sync', this.render);
  },

  addReviewView: function(review) {
    var subview = new BDMI.Views.Review({ model: review });
    this.addSubview("#review-section",subview);
  },

  render: function() {
    var content = this.template({ movie: this.model, movie_image: this.image });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
