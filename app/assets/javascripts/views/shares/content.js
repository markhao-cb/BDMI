BDMI.Views.Content = Backbone.CompositeView.extend({
  template: JST['content'],

  className: "main_content group",

  initialize: function() {
    this.addMovieIndexView();
  },

  addMovieIndexView: function() {
    var movies = new BDMI.Collections.Movies();
    movies.fetch();
    var subview = new BDMI.Views.MoviesIndex({ collection: movies });
    this.addSubview('.all-movies', subview);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
