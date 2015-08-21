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
    player = new YT.Player('player', {
      height: '506',
      width: '900',
      videoId: this.model.get("source"),
      playerVars: {
        'showinfo' : 0
      },
      events: {
        'onReady': "onPlayerReady",
        'onStateChange': "onPlayerStateChange"
      }
    });
  },
    // autoplay video
  onPlayerReady: function(event) {
      event.target.playVideo();
  },
});
