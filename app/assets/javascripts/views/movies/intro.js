BDMI.Views.Intro = Backbone.CompositeView.extend({
  template: JST['intro'],

  className: "intro-body",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ movie: this.model });
    this.$el.html(content);
    return this;
  }
});
