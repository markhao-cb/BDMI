BDMI.Views.ActorItem = Backbone.View.extend({
  template: JST['actors/actor_item'],

  className: 'actor-item group',

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var profile_url = this.model.attributes.base_url + "original" +
    this.model.attributes.profile_path;
    var content = this.template({
      actor: this.model,
      profile_url: profile_url
     });
    this.$el.html(content);
    return this;
  }
});
