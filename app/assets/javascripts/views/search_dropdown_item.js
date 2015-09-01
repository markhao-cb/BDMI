BDMI.Views.SearchDropDownItem = Backbone.View.extend({
  template: JST['movie/search_dropdown_item'],

  className: 'search-dropdown-item',

  events: {
    'click': "handleClick"
  },

  initialize: function(options) {
    this.type = options.type;
  },

  render: function() {
    if (this.type === 'movie') {
      var image_url = this.model.attributes.base_url + "original" +
      this.model.attributes.poster_path;
      var title = this.model.attributes.title;
    } else {
      var image_url = this.model.attributes.base_url + "original" +
      this.model.attributes.profile_path;
      var title = this.model.attributes.name;
    }
    var content = this.template({
      image_url: image_url,
      title: title
    });
    this.$el.html(content);
    return this;
  },

  handleClick: function() {
    window.scrollTo(0, 0);
    if (this.type === 'movie') {
      Backbone.history.navigate("movies/"+this.model.id, { trigger: true });
    } else {
      Backbone.history.navigate('person/'+ this.model.id, { trigger: true });
    }
  }
});
