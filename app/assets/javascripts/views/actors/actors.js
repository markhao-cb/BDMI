BDMI.Views.Actors = Backbone.CompositeView.extend({
  template: JST['actors/actors'],

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addActorView);
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.each(this.addActorView.bind(this));
  },

  addActorView: function(actor) {
    var subview = new BDMI.Views.Actor({ model: actor });
    this.addSubview(".all-actors",subview);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
