BDMI.Views.UserReviews = Backbone.CompositeView.extend({
  template: JST['users/user_reviews'],

  className: 'user-review-container group',

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addReviewItem);
    this.collection.each(this.addReviewItem.bind(this));
  },

  addReviewItem: function(review) {
    var subview = new BDMI.Views.UserPageReviewItem({ model: review });
    this.addSubview('.all-reviews', subview);
  },

  render: function() {
    var content = this.template();
    if (this.collection.length === 0) {
      content = "<h4 class='no-review user-no'>You don't have any reviews.</h4>";
    }
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
