BDMI.Views.AlertView = Backbone.View.extend({
  template: function() {
    switch (this.alertType) {
      case "success":
        return JST['alerts/success_alert'];
      case "decline":
        return JST['alerts/decline_alert'];
      case "no_more":
        return JST['alerts/no_more_alert'];
      default:
        return JST['alerts/success_alert'];
    }
  },

  className: "alert-view",

  initialize: function(options) {
    this.alertType = options.alertType;
    this.messages = options.messages;
  },

  render: function() {
    var content;
    if (this.alertType === "decline") {
      debugger
      content = this.template({ messages: this.messages.error });
    } else {
      debugger
      content = this.template();
    }
    this.$el.html(content);
    return this;
  }
});
