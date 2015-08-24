BDMI.Views.InfoView = Backbone.CompositeView.extend({
  template: JST['show/info'],

  className: "movie-info",

  events : {
    "click #add-to-list-btn": "addToList",
    "click #watched-btn": "addWatched"
  },

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
    var subview = new BDMI.Views.Poster({
      model: poster,
      movie_id: this.model.id
    });
    this.addSubview(".movie-poster", subview);
  },

  onRender: function() {
    this.generateStar();
    this.generateRelation();
  },

  generateStar: function() {
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

  generateRelation: function() {
    if (this.model.attributes.in_watched) {
      this.changeToWatched();
    }
    if (this.model.attributes.in_wanted) {
      this.changeToWanted();
    }
  },

  changeToWatched: function() {
    $("#watched-btn").remove();
    var $watched = $("<label><i class='fa fa-check'></i> Watched!</label>");
    $watched.addClass('btn');
    $watched.css('color', 'red');
    $('#watched').append($watched);
  },

  changeToWanted: function() {
    $("#add-to-list-btn").remove();
    var $wanted = $("<label><i class='fa fa-check'></i> Added!</label>");
    $wanted.addClass('btn');
    $wanted.css('color', 'green');
    $('#add-to-list').append($wanted);
  },

  addToList: function(event) {

  },

  addWatched: function(event) {
    if (BDMI.CURRENT_USER === undefined) {
      this.flashAlert(["Please login first."]);
    } else {
      var watchedMovie = new BDMI.Models.WatchedMovie();
      watchedMovie.save({ movie_id: this.model.id }, {
        success: function() {
          this.changeToWatched();
        },
        error: function() {
          debugger
        }
      });
    }
  }
});
