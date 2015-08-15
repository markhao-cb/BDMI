BDMI.Views.Main = Backbone.CompositeView.extend({
  template: JST['main'],

  className: "main_container group",

  initialize: function() {
    this.introMovies = new BDMI.Collections.IntroMovies();
    this.addIntroView();
    this.addMovieInTheatersView();
    this.addRankView();
    this.addSearchView();
  },

  addIntroView: function() {
    var that = this;
    this.introMovies.fetch({
      success: function() {
        var introMovie = this.introMovies.sample();
        var subview = new BDMI.Views.Intro({ model: introMovie });
        this.addSubview('.intro',subview);
      }.bind(this)
    });
  },

  addMovieInTheatersView: function() {
    var movies = new BDMI.Collections.InTheatersMovies();
    movies.fetch();
    var subview = new BDMI.Views.InTheaters({ collection: movies });
    this.addSubview('#new', subview);
  },

  addRankView: function() {
    var subview = new BDMI.Views.Rank();
    this.addSubview('#rank',subview);
  },

  addSearchView: function() {
    var subview = new BDMI.Views.Search();
    this.addSubview('#search',subview);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.navScroll();
    return this;
  },

  navScroll: function() {
    $(window).scroll(function() {
      if($(".navbar").length !== 0) {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
      }
    });
  }

});
