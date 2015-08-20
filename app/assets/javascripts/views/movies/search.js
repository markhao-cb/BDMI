BDMI.Views.Search = Backbone.CompositeView.extend({
  template: JST['movie/search'],

  className: "search-section",

  events: {
    "submit form": "search"
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  search: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON().search;
    if (formData[1] === "movie") {
      Backbone.history.navigate("search/movies/"+formData[0], { trigger: true });
    } else {
      var searchPerson = new BDMI.Models.Actor({
        name: formData[0]
      });
    }
  }
});
