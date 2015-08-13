BDMI.Views.Search = Backbone.CompositeView.extend({
  template: JST['movie/search'],

  className: "row",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
