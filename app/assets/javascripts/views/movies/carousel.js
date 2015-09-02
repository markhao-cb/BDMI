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
    var image_url = this.model.images().first().attributes.image_url.slice(0,48)+
    "/c_lpad,w_800"+this.model.images().first().attributes.image_url.slice(48);
    var content = this.template({ image_url: image_url });
    this.$el.html(content);
    return this;
  },

  show: function(event) {
    Backbone.history.navigate("movies/" + this.model.id, { trigger: true} );
  }
});
