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
    this.movies.getOrFetch(id);

  },

  swap: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  }
});
