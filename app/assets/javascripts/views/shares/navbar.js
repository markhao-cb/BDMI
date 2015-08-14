BDMI.Views.Navbar = Backbone.CompositeView.extend({
  template: JST['shares/new_nav'],

  className: "nav group",

  initialize: function(options) {
    this.router = options.router;
    this.listenTo(this.router, 'routes', this.handleNav);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.onRender();
    return this;
  },

  handleNav: function(routeName, params) {
    $(".active").removeClass('active');
    $("." + routeName).addClass('active');
  },

  onRender: function() {
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click(function() {
        });
    });
  }
});
