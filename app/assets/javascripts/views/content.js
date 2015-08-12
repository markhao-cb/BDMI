BDMI.Views.Content = Backbone.CompositeView.extend({
  template: JST['content'],

  className: "main_content group",

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
