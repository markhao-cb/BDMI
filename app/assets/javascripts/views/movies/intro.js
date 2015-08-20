BDMI.Views.Intro = Backbone.CompositeView.extend({
  template: JST.intro,

  // className: "hot-body group",

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
    this.attachSubviews();
    this.addPageScrollAnimation();
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
        if(Backbone.history.getFragment() !== "") {
          Backbone.history.navigate("", { trigger: true });
        }
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
  },

  generateYTPlayer: function() {
    var player;
    player = new YT.Player('player', {
      height: '484',
      width: '750',
      videoId: 'gOW_azQbOjw',
      events: {
        'onReady': "onPlayerReady",
        'onStateChange': "onPlayerStateChange"
      }
    });
  },

    // autoplay video
  onPlayerReady: function(event) {
        // event.target.playVideo();
        // $('.carousel').carousel();
    },

    // when video ends
    onPlayerStateChange: function(event) {
      if(event.data === 0) {
          $('.carousel').carousel();
          event.target.parent.removeChild();
      }
    }
});
