BDMI.Views.ResultView = Backbone.CompositeView.extend({
  template: JST["movie/results"],

  events: {
    "click #sort_by_date":"sort_by_date",
    "click #sort_by_rating":"sort_by_rating",
    "click #sort_by_count":"sort_by_count"
  },

  class_name: "my-search-result",

  initialize: function(options) {
    this.firstItem = true;
    this.listenTo(this.collection, 'sync', this.render);
    this.keyword = options.keyword;
    this.section = options.section;
    this.addLoadingView();
    this.addPageScrollAnimation();
  },

  addResultView: function(result) {
    if (this.firstItem) {
      var firstSubview = new BDMI.Views.FirstResultView({ model: result });
      this.addSubview("#results-section", firstSubview);
      this.firstItem = false;
    } else {
      var subview = new BDMI.Views.ResultsItem({ model: result });
      this.addSubview("#results-section",subview);
    }
  },

  insertModelToSubviews: function() {
    var modelArr = _.toArray(this.collection.models).reverse();
    var subviews = _.toArray(this.subviews("#results-section")._wrapped);
    for (var i = 0; i < modelArr.length; i++) {
      subviews[i].model = modelArr[i];
      subviews[i].render();
    }
  },

  render: function() {
    var content = this.template({
      keyword: this.keyword,
      section: this.section
    });
    this.$el.html(content);
    if (_.size(this.collection) !== 0) {
      var filtered = _.filter(this.collection.models, function(model) {
        return model.escape("release_date") !== "" &&
               model.escape("vote_count") > 2;
      });
      if (filtered.length === 0) {
        $(".wrap_body").remove();
        this.flashAlert(['No results for "'+ this.keyword +'"... ']);
      } else {
        this.collection = new BDMI.Collections.SearchedMovies(filtered);
        this.collection.each(this.addResultView.bind(this));
        $(".wrap_body").remove();
      }
    }
    this.attachSubviews();
    return this;
  },

  sort_by_date: function(event) {
    this.$(".btn").removeClass('active');
    $(event.currentTarget).addClass('active');
    this.collection.comparator = "release_date";
    this.collection.sort();
    this.insertModelToSubviews();
  },

  sort_by_count: function(event) {
    this.$(".btn").removeClass('active');
    $(event.currentTarget).addClass('active');
    this.collection.comparator = "vote_count";
    this.collection.sort();
    this.insertModelToSubviews();
  },

  sort_by_rating: function(event) {
    this.$(".btn").removeClass('active');
    $(event.currentTarget).addClass('active');
    this.collection.comparator = "vote_average";
    this.collection.sort();
    this.insertModelToSubviews();
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
