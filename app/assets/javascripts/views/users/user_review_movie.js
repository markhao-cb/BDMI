BDMI.Views.UserReviewItem = Backbone.CompositeView.extend({
  template: JST['users/user_review_movie'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
