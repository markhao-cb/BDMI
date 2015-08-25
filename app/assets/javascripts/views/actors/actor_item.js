BDMI.Views.ActorItem = Backbone.View.extend({
  template: JST['actors/actor_item'],

  className: 'actor-item group',

  events: {
    'click': 'handleClick',
    "mouseenter .small_image": "handleEnter",
    "mouseleave .small_image": "handleLeave"
  },

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
  },

  handleClick: function(event) {
    this.$el.addClass('animated flipOutX');
    this.$el.one('webkitAnimationEnd', function() {
      Backbone.history.navigate('person/'+ this.model.id, { trigger: true });
    }.bind(this));
  },

  handleEnter: function(event) {
    $(event.currentTarget).addClass('animated infinite pulse');
  },

  handleLeave: function(event) {
    $(event.currentTarget).removeClass('animated infinite pulse');
  },
});
