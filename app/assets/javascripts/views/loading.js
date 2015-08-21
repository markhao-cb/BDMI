BDMI.Views.LoadingView = Backbone.View.extend({
  template: JST['shares/loading'],

  className: "wrap_body",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
