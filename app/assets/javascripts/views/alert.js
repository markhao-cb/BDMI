BDMI.Views.AlertView = Backbone.View.extend({
  template: function() {
    switch (this.alertType) {
      case "success":
        return JST['alerts/success_alert'];
      case "decline":
        return JST['alerts/decline_alert'];
      case "no_more":
        return JST['alerts/no_more'];
      default:
        return JST['alerts/success'];
    }
  },

  className: "alert-view",

  initialize: function(options) {
    this.alertType = options.alertType;
  },

  render: function() {
    var content = this.template({ alertType: this.alertType });
    this.$el.html(content);
    return this;
  }
});
