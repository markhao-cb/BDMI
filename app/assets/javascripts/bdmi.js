window.BDMI = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#main");
    var router = new BDMI.Routers.Router({
      $rootEl: $rootEl,
    });

    var navbar = new BDMI.Views.Navbar({
      router: router
    });

    $("#navbar").html(navbar.render().$el);
    Backbone.history.start();
  }
};
