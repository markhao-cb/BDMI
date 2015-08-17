BDMI.Views.Poster = Backbone.View.extend({
  template: JST['show/poster'],

  render: function() {
    var content = this.template({ poster: this.model });
    this.$el.html(content);
    return this;
  }
});
