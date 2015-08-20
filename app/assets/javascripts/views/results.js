BDMI.Views.ResultView = Backbone.CompositeView.extend({
  template: JST.results,

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addResultView);
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.each(this.addResultView.bind(this));
  },

  addResultView: function(result) {
    debugger
    // var subview = new BDMI.VIews.ResultsItem({ model: result });
    // this.addSubview("#results-section",subview);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
