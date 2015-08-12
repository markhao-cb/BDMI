BDMI.Views.MoviesIndex = Backbone.CompositeView.extend({
  template: JST['movie/index'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addMovieView);
    this.collection.each(this.addMovieView.bind(this));
    this.listenTo(this.collection, 'remove', this.removeMovieView);
  },

  addMovieView: function(movie) {
    var subview = new BDMI.Views.MovieIndexItem({ model: movie });
    this.addSubview(".movie-index", subview);
  },

  render: function() {
    var indexContent = this.template();
    this.$el.html(indexContent);
    this.attachSubviews();
    return this;
  },

  removeMovieView: function(movie) {
    this.removeModelSubview(".movie-index",movie);
  }
});
