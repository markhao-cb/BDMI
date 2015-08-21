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
      this.collection = new BDMI.Collections.SearchedMovies(filtered);
      this.collection.each(this.addResultView.bind(this));
      $(".wrap_body").remove();
    }
    this.attachSubviews();
    return this;
  },

  sort_by_date: function() {
    this.collection.comparator = "release_date";
    this.collection.sort();
    this.insertModelToSubviews();
  },

  sort_by_count: function() {
    this.collection.comparator = "vote_count";
    this.collection.sort();
    this.insertModelToSubviews();
  },

  sort_by_rating: function() {
    this.collection.comparator = "vote_average";
    this.collection.sort();
    this.insertModelToSubviews();
  },

  addLoadingView: function() {
    this.loadingView = new BDMI.Views.LoadingView();
    $("body").append(this.loadingView.render().$el);
  }
});
