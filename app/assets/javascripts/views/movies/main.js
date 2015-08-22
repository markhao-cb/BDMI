BDMI.Views.Main = Backbone.CompositeView.extend({
  template: JST.main,

  className: "main_container group",

  initialize: function() {
    this.addIntroView();
    this.addMovieInTheatersView();
    this.addTopRatedView();
    this.addSearchView();
  },

  addIntroView: function() {
    var introMovies = new BDMI.Collections.IntroMovies();
    var subview = new BDMI.Views.Intro({ collection: introMovies });
    this.addSubview('#hot',subview);
  },

  addMovieInTheatersView: function() {
    var movies = new BDMI.Collections.InTheatersMovies();
    var subview = new BDMI.Views.InTheaters({ collection: movies });
    this.addSubview('#new', subview);
  },

  addTopRatedView: function() {
    var movies = new BDMI.Collections.TopRatedMovies();
    var subview = new BDMI.Views.TopRatedView({ collection: movies });
    this.addSubview('#top',subview);
  },

  addSearchView: function() {
    var subview = new BDMI.Views.Search();
    this.addSubview('#search',subview);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

});
