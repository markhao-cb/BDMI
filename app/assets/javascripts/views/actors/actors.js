BDMI.Views.Actors = Backbone.CompositeView.extend({
  template: JST['actors/actor'],

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addActorView);
    this.listenTo(this.collection, 'sync', this.render);
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
