BDMI.Views.Review = Backbone.View.extend({
  template: JST['review'],

  initialize: function(options) {
    this.newestReview = options.newestReview;
    this.hottestReview = options.hottestReview;
  },

  render: function() {
    var content = this.template({
      newestReview: this.newestReview,
      hottestReview: this.hottestReview
    });
    this.$el.html(content);
    return this;
  }
});
