BDMI.Views.Movie = Backbone.CompositeView.extend({
  template: JST['movie/show'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
