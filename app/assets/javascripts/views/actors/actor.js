BDMI.Views.Actor = Backbone.CompositeView.extend({
  template: JST['actors/actor'],

  className: "view view-ninth",

  render: function() {
    var content = this.template({
      actor: this.model,
      image_url: this.model.attributes.images[0].image_url
    });
    this.$el.html(content);
    return this;
  }
});
