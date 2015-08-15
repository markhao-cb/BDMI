BDMI.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "movies/:id": "show",
    "form": "review_form"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.movies = new BDMI.Collections.Movies();
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

  review_form: function() {
    var formView = new BDMI.Views.ReviewForm();
    this.swap(formView);
  },

  swap: function(view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  }
});
