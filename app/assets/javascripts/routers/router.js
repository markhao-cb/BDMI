BDMI.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "movies/:id": "movieShow",
    "person/:id": "personShow",
    "search/movies/:title": "movieIndex",
    "search/person/:name": "personIndex",
    "genres/:genre":"genresIndex"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.movies = new BDMI.Collections.Movies();
    this.person = new BDMI.Collections.MovieActors();
  },

  index: function() {
    var mainView = new BDMI.Views.Main();
    this.swap(mainView);
  },

  movieShow: function(id) {
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
      success: function(collection) {
        if (collection.length === 0) {
          $(".wrap_body").remove();
          this.flashAlert(["Results not found. Redirecting to the home page..."]);
        }
      }.bind(this)
    });
    var resultView = new BDMI.Views.ResultView({
      collection: searchedMovies,
      keyword:title,
      section: "movie"
    });
    this.swap(resultView);
  },

  personShow: function(id) {
    var person = this.person.getOrFetch(id);
    var showView = new BDMI.Views.ActorShow({ model: person });
    this.swap(showView);
  },

  personIndex: function(name) {
    var searchedPerson = new BDMI.Collections.MovieActors();
    var person = searchedPerson.fetch({
      data: {
        name: name
      },
      processData: true,
      success: function(collection) {
        $(".wrap_body").remove();
        if (collection.length === 0) {
          this.flashAlert(["Results not found. Redirecting to the home page..."]);
        }
      }.bind(this)
    });
    var resultView = new BDMI.Views.ActorResult({
      collection: searchedPerson,
      keyword: name,
      section: "person"
    });
    this.swap(resultView);
  },

  genresIndex: function(genre) {
    var genres = new BDMI.Collections.Genres();
    var genresIndexView = new BDMI.Views.GenresIndex({
      collection: genres,
      genre: genre
    });
    this.swap(genresIndexView);
  },

  swap: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  },

  flashAlert: function(messages) {
    var alertView = new BDMI.Views.AlertView({
      messages: messages
    });
    $('body').append(alertView.$el);
    alertView.render();
    alertView.$(".alert").addClass('animated fadeIn');
    setTimeout(function() {
      alertView.$(".alert").removeClass('fadeIn');
      alertView.$(".alert").addClass('fadeOut');
      alertView.$(".alert").one("webkitAnimationEnd", function() {
        alertView.remove();
        window.scrollTo(0, 0);
        Backbone.history.navigate("", { trigger: true });
      });
    },3000);
  }
});
