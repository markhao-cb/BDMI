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
    this.navScroll();
    $("body").scrollspy({ target: '.navbar-fixed-top' });
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
  },

  navScroll: function() {
    $(window).scroll(function() {
      if($(".navbar").length !== 0) {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
      }
    });
  }
});
