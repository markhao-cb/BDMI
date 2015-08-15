BDMI.Views.ReviewForm = Backbone.View.extend({
  template: JST['review_form'],

  className: "review-form group",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.onRender();
    // new StarRating();
    return this;
  },

  onRender: function() {
    this.$('#star').raty('destroy');
    this.$('#star').raty({
      path: "/assets/",
      helf: true,
      score: 0,
      scoreName:"review[rating]"
    });
  }
});
