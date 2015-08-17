BDMI.Views.AlertView = Backbone.View.extend({
  template: JST.alert,

  className: "alert-view",

  render: function() {
    var content = this.template({ success:this.success });
    this.$el.html(content);
    return this;
  }
});
