BDMI.Views.FirstResultView = Backbone.CompositeView.extend({
  template: JST['movie/first_result_item'],

  className: "results_item",

  events: {
    "click .first-item-image":"handleClick",
    "click #explore": "explore",
    "mouseenter .first-item-image": "handleEnter",
    "mouseleave .first-item-image": "handleLeave"
  },

  initialize: function() {
    this.listenTo(this.model, 'sync change', this.render);
  },

  render: function() {
    var poster_url = this.model.attributes.base_url + "original" +
    this.model.attributes.poster_path;
    var content = this.template({ movie: this.model, poster_url: poster_url });
    this.$el.html(content);
    this.onRender();
    return this;
  },

  handleClick: function(event) {
    this.$el.addClass('animated flipOutX');
    this.$el.one('webkitAnimationEnd', function() {
      this.movieShow();
      this.render();
    }.bind(this));
  },

  movieShow: function() {
    window.scrollTo(0, 0);
    Backbone.history.navigate("movies/"+this.model.id, { trigger: true });
  },

  handleEnter: function(event) {
    $(event.currentTarget).addClass('animated infinite pulse');
  },

  handleLeave: function(event) {
    $(event.currentTarget).removeClass('animated infinite pulse');
  },

  onRender: function() {
    this.$('#star').raty('destroy');
    var grade = this.model.attributes.vote_average / 2;
    this.$('#star').raty({
      starOff: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-off_j7trzb.png",
      starOn: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-on_iezcg6.png",
      starHalf: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-half_w79ezb.png",
      helf: true,
      score: grade,
      readOnly: true
    });
  },

  explore: function(event) {
    window.scrollTo(0, 0);
    Backbone.history.navigate("movies/"+this.model.id, { trigger: true });
  }
});
