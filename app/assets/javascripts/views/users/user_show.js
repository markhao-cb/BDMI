BDMI.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/user_show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.addReviewView();
    this.addWatchListView();
    this.addWatchedListView();
    this.addPageScrollAnimation();
  },

  addReviewView: function() {
    var subview = new BDMI.Views.UserReviews({ collection: this.model.reviews() });
    this.addSubview('.user-reviews', subview);
  },

  addWatchListView: function() {
    var subview = new BDMI.Views.UserWatchList({ collection: this.model.wantedMovies() });
    this.addSubview('.user-watchlist', subview);
  },

  addWatchedListView: function() {
    var subview = new BDMI.Views.UserWatchedList({ collection: this.model.watchedMovies() });
    this.addSubview('.user-watched-list', subview);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addPageScrollAnimation: function() {
    $('a.page-scroll').bind('click', function(event) {
        if(Backbone.history.getFragment() !== "" &&
          !$(event.currentTarget).hasClass('user_login')) {
          Backbone.history.navigate("", { trigger: true });
        }
        var $anchor = $(this);
        if ($($anchor.attr('href')) !== []) {
          $('html, body').stop().animate({
              scrollTop: $($anchor.attr('href')).offset().top
          }, 1500, 'easeInOutExpo');
        }
        event.preventDefault();
    });
  }
});
