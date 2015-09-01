BDMI.Views.SearchDropDownItem = Backbone.View.extend({
  template_movie: JST['movie/search_dropdown_item'],

  template_actor: JST['actors/search_dropdown_item'],

  className: 'search-dropdown-item',

  events: {
    'click': "handleClick"
  },

  initialize: function(options) {
    this.type = options.type;
  },

  render: function() {
    if (this.type === 'movie') {
      this.poster_url = this.model.attributes.base_url + "original" +
      this.model.attributes.poster_path;
      this.$el.html(this.template_movie({
        poster_url: this.poster_url,
        movie: this.model
      }));
      this.onRender();
    } else {
      var image_url = this.model.attributes.base_url + "original" +
      this.model.attributes.profile_path;
      var title = this.model.attributes.name;
      this.$el.html(this.template_actor({
        image_url: image_url,
        title: title
      }));
    }
    return this;
  },

  handleClick: function() {
    window.scrollTo(0, 0);
    if (this.type === 'movie') {
      Backbone.history.navigate("movies/"+this.model.id, { trigger: true });
    } else {
      Backbone.history.navigate('person/'+ this.model.id, { trigger: true });
    }
  },

  onRender: function() {
    this.$('#star').raty('destroy');
    var grade = this.model.attributes.vote_average / 2;
    this.$('#star').raty({
      starOff: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-off_j7trzb.png",
      starOn: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-on_iezcg6.png",
      starHalf: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-half_w79ezb.png",
      helf: true,
      score: grade,
      readOnly: true
    });
  },
});
