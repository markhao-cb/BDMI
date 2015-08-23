BDMI.Views.CarouselItemView = Backbone.CompositeView.extend({
  template: JST['movie/carousel'],

  className: "item",

  events: {
    "click": "show"
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var image = this.model.images().first();
    var content = this.template({ image: image });
    this.$el.html(content);
    return this;
  },

  show: function(event) {
    Backbone.history.navigate("movies/" + this.model.id, { trigger: true} );
  }
});
