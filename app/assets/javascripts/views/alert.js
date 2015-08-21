BDMI.Views.AlertView = Backbone.View.extend({
  template: JST['alerts/no_more_alert'],

  className: "alert-view",

  initialize: function(options) {
    this.messages = options.messages;
  },

  render: function() {
    var messages = this.messages.join(", ");
    var content = this.template({ messages: messages });
    this.$el.html(content);
    return this;
  }
});
