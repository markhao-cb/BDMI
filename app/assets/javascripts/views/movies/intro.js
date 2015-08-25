BDMI.Views.Intro = Backbone.CompositeView.extend({
  template: JST["movie/intro"],

  className: "hot-section",

  initialize: function() {
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addCarouselItem);
    this.collection.each(this.addCarouselItem.bind(this));
  },

  addCarouselItem: function(movie) {
    var subview = new BDMI.Views.CarouselItemView({ model:movie });
    this.addSubview('#owl-example',subview);
  },

  render: function() {
    var content = this.template({ movie: this.model, movie_image: this.image });
    this.$el.html(content);
    this.addPageScrollAnimation();
    this.attachSubviews();
    $("#owl-example").owlCarousel({
      navigation : false, // Show next and prev buttons
      stopOnHover: true,
      singleItem:true,
      autoPlay:true,
      afterAction: function(event) {

      }
  });
    return this;
  },

  addPageScrollAnimation: function() {
    $('a.page-scroll').bind('click', function(event) {
        if(Backbone.history.getFragment() !== "" &&
          !$(event.currentTarget).hasClass('user_login')) {
          Backbone.history.navigate("", { trigger: true });
        }
        var $anchor = $(this);
        if ($($anchor.attr('href')) !== []) {
          $('html, body').stop().animate({
              scrollTop: $($anchor.attr('href')).offset().top
          }, 1500, 'easeInOutExpo');
        }
        event.preventDefault();
    });
  }
});
