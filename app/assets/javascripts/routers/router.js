BDMI.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  index: function() {
    var mainView = new BDMI.Views.Main();
    this.swap(mainView);
  },

  show: function(id) {
    var movie = this.movies.getOrFetch(id);
    var showView = new BDMI.Views.Movie({model: movie});
    this.swap(showView);
  },

  swap: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  }
});
