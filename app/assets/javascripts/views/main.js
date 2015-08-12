BDMI.Views.Main = Backbone.CompositeView.extend({
  template: JST['main'],

  className: "main_container group",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
