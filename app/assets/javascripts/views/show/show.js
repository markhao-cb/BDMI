BDMI.Views.Movie = Backbone.CompositeView.extend({
  template: JST['movie/show'],

  className: "movie-show container group",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.generateSubviews);
    this.listenTo(this.model, 'sync', this.render);
    this.addLoadingView();
    this.addPageScrollAnimation();
  },

  generateSubviews: function() {
    this.addInfoView();
    this.addActorView();
    this.addReviewView();
    $(".wrap_body").remove();
  },

  addInfoView: function() {
    var subview = new BDMI.Views.InfoView({ model: this.model });
    this.addSubview("#info-section", subview);
  },

  addActorView: function() {
    var subview = new BDMI.Views.Actors({ collection: this.model.actors() });
    this.addSubview("#actor-section", subview);
  },

  addReviewView: function() {
    var reviews = new BDMI.Collections.Reviews();
    var subview = new BDMI.Views.MovieReviews({
      collection: reviews,
      movie: this.model
    });
    this.addSubview("#review-section", subview);
  },

  render: function() {
    var content = this.template({ movie: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addLoadingView: function() {
    this.loadingView = new BDMI.Views.LoadingView();
    $("body").append(this.loadingView.render().$el);
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
