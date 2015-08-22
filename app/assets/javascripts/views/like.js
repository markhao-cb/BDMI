BDMI.Views.LikeView = Backbone.CompositeView.extend({
  template: JST.like,

  className: "like-section group",

  events: {

  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
