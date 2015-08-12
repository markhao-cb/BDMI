BDMI.Views.MovieIndexItem = Backbone.CompositeView.extend({
  template: JST['movie/movie_index_item'],

  className: "movie_index_item",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ movie: this.model });
    this.$el.html(content);
    return this;
  }
});
