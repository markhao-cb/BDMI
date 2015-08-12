BDMI.Views.Sidebar = Backbone.CompositeView.extend({
  template: JST['sidebar'],

  className: "main_sidebar group",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
