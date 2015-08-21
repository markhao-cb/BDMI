BDMI.Views.AlertView = Backbone.View.extend({
  // template: function() {
  //   switch (this.alertType) {
  //     case "success":
  //       return JST['alerts/success_alert'];
  //     case "decline":
  //       return JST['alerts/decline_alert'];
  //     case "no_more":
  //       return JST['alerts/no_more_alert'];
  //     case "login":
  //       return JST['alerts/log_in_alert'];
  //     default:
  //       return JST['alerts/success_alert'];
  //   }
  // },
  template: JST['alerts/no_more_alert'],

  className: "alert-view",

  initialize: function(options) {
    this.alertType = options.alertType;
    this.messages = options.messages;
  },

  render: function() {
    var messages = this.messages.join(", ");
    var content = this.template({ messages: messages });
    this.$el.html(content);
    return this;
  }
});
