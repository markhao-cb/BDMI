BDMI.Views.Actor = Backbone.CompositeView.extend({
  template: JST['actors/actor'],

  className: "view view-ninth actots-item",

  render: function() {
    character = this.model.attributes.castings[0].act_as;
    image_url = this.model.attributes.images[0].image_url;
    fit_image_url = image_url.slice(0,49) + "c_fill,g_center,h_300,w_200/" + image_url.slice(49);
    var content = this.template({
      actor: this.model,
      image_url:fit_image_url,
      character:character
    });
    this.$el.html(content);
    return this;
  }
});
