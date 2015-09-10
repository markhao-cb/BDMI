BDMI.Views.TrailerView = Backbone.CompositeView.extend({
  template: JST['movie/trailer'],

  className: "player",

  events: {
    'click .close-play': 'remove'
  },


  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.loadIframe();
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.generateYTPlayer();
    return this;
  },

  // This code loads the IFrame Player API code asynchronously.
  loadIframe: function() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  },

  generateYTPlayer: function() {
    var player;
    var width = $(window).width() * 0.5;
    var height = width / 16 * 9;
    player = new YT.Player('player', {
      height: height.toString(),
      width: width.toString(),
      videoId: this.model.get("source"),
      playerVars: {
        'showinfo' : 0
      },
      events: {
        'onReady': "onPlayerReady",
        'onStateChange': "onPlayerStateChange"
      }
    });
    console.log("From the developer: It's possible that you are getting Chrome extension errors. It's a known bug which the Google Chromecast team is working on. Please ignore them or you can install a extension to temporarily remove those errors. Link here: 'https://chrome.google.com/webstore/detail/google-cast/boadgeojelhgndaghljhdicfkmllpafd/reviews?hl=en'")
  },
    // autoplay video
  onPlayerReady: function(event) {
      event.target.playVideo();
  },
});
