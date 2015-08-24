BDMI.Views.ActorInfoView = Backbone.CompositeView.extend({
  template: JST['actors/actor_info'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var profile_url = this.model.images().first().attributes.image_url;
    var content = this.template({
      actor: this.model,
      profile_url: profile_url
     });
    this.$el.html(content);
    return this;
  }
});
