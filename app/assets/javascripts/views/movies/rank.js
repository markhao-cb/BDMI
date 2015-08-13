BDMI.Views.Rank = Backbone.CompositeView.extend({
  template: JST['movie/rank'],

  className: "rank-section",

  attributes: {
    "id": "rank"
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
