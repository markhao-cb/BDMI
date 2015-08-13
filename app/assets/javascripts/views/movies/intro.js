BDMI.Views.Intro = Backbone.CompositeView.extend({
  template: JST['intro'],

  className: "intro-body",

  initialize: function() {
    this.image = this.model._images.first();
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ movie: this.model, movie_image: this.image });
    this.$el.html(content);
    return this;
  }
});
