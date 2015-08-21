BDMI.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "movies/:id": "show",
    "search/movies/:title": "movieIndex",
    "search/person/:name": "personIndex",
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.movies = new BDMI.Collections.Movies();
  },

  index: function() {
    var mainView = new BDMI.Views.Main();
    this.swap(mainView);
  },

  show: function(id) {
    var movie = this.movies.getOrFetch(id);
    var showView = new BDMI.Views.Movie({ model: movie });
    this.swap(showView);
  },

  movieIndex: function(title) {

    var searchedMovies = new BDMI.Collections.SearchedMovies();
    var searchedMovie = searchedMovies.fetch({
      data: {
        title:title
      },
      processData: true,
      success: function() {

      }
    });
    var resultView = new BDMI.Views.ResultView({
      collection: searchedMovies,
      keyword:title,
      section: "movie"
    });
    this.swap(resultView);
  },

  personIndex: function(name) {

  },

  swap: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  }
});
