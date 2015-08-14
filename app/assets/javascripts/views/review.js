BDMI.Views.Review = Backbone.View.extend({
  template: JST['review'],

  className: "review-section-item",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ review: this.model });
    this.$el.html(content);
    return this;
  }
});
