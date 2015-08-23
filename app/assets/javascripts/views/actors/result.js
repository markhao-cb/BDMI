BDMI.Views.ActorResult = Backbone.CompositeView.extend({
  template: JST["actors/result"],

  events: {
    "click #sort_by_date":"sort_by_date",
    "click #sort_by_rating":"sort_by_rating",
    "click #sort_by_count":"sort_by_count"
  },

  class_name: "my-search-result",

  initialize: function(options) {
    this.listenTo(this.collection, 'add', this.addResultView);
    this.listenTo(this.collection, 'sync', this.render);
    this.keyword = options.keyword;
    this.section = options.section;
    this.collection.each(this.addResultView.bind(this));
    this.addLoadingView();
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
  }
});
