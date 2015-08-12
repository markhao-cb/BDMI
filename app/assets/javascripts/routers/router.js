BDMI.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "movies/:id": "show"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.movies = new BDMI.Collections.Movies();
  },

  index: function() {
    this.movies.fetch();
    var movieIndexView = new BDMI.Views.MoviesIndex({ collection: this.movies });
    
  },

  show: function(id) {
    this.movies.getOrFetch(id);

  },

  swap: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  }
});
