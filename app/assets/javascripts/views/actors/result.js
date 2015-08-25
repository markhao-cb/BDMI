BDMI.Views.ActorResult = Backbone.CompositeView.extend({
  template: JST["actors/result"],

  class_name: "my-search-result",

  initialize: function(options) {
    this.listenTo(this.collection, 'add', this.addResultView);
    this.listenTo(this.collection, 'sync', this.render);
    this.keyword = options.keyword;
    this.section = options.section;
    this.collection.each(this.addResultView.bind(this));
    this.addLoadingView();
    this.addPageScrollAnimation();
  },

  addResultView: function(result) {
    var subview = new BDMI.Views.ActorItem({ model: result });
    this.addSubview("#results-section",subview);
  },

  render: function() {
    var content = this.template({
      keyword: this.keyword,
      section: this.section
    });
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
