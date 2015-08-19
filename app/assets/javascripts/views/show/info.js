BDMI.Views.InfoView = Backbone.CompositeView.extend({
  template: JST['show/info'],

  className: "movie-info",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.addPosterView();
  },

  render: function() {
    var content = this.template({ movie: this.model });
    this.$el.html(content);
    this.onRender();
    this.attachSubviews();
    return this;
  },

  addPosterView: function() {
    var poster = this.model.posters().first();
    var subview = new BDMI.Views.Poster({ model: poster });
    this.addSubview(".movie-poster", subview);
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

  generateStars: function() {
    var grade = this.model.attributes.vote_average / 2;
    $('vote-average').raty({
      score: grade,
      readOnly: true
    });
  }
});
