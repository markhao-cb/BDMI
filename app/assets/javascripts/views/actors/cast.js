BDMI.Views.Casts = Backbone.CompositeView.extend({
  template: JST['actors/casts'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addItemView);
    this.collection.each(this.addItemView.bind(this));
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  addItemView: function(movie) {
    var subview = new BDMI.Views.CastsItem({ model: movie });
    this.addSubview('.all-casts',subview);
  }
});
