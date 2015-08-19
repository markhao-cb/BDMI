BDMI.Views.CarouselItemView = Backbone.CompositeView.extend({
  template: JST['movie/carousel'],

  className: "item",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var image = this.model.images().first();
    var content = this.template({ image: image });
    this.$el.html(content);
    return this;
  }
});
