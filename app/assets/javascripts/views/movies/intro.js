BDMI.Views.Intro = Backbone.CompositeView.extend({
  template: JST['intro'],

  className: "intro-body",

  initialize: function() {
    // this.addMovieIndexView();
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
