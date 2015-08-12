BDMI.Views.MoviesIndex = Backbone.CompositeView.extend({
  template: JST['movie/index'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var indexContent = this.template({ movies: this.collection });
    this.$el.html(indexContent);
    return this;
  }
});
