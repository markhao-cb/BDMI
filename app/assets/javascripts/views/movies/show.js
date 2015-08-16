BDMI.Views.Movie = Backbone.CompositeView.extend({
  template: JST['movie/show'],

  className: "movie-show container group",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  addInfoView: function() {
    var subview = new BDMI.Views.Info({ model: this.model });
    this.addSubview("#info-section", subview);
  },

  addPosterView: function() {
    var subview = new BDMI.Views.Poster({ model: this.model });
    this.addSubview("#poster-section", subview);
  },

  addActorView: function() {
    var subview = new BDMI.Views.Actor({ model: this.model });
    this.addSubview("#actor-section", subview);
  },

  addReviewView: function() {
    var subview = new BDMI.Views.MovieReview({ model: this.model });
    this.addSubview("#review-section", subview);
  },

  render: function() {
    var content = this.template({ movie: this.model });
    this.$el.html(content);
    return this;
  }
});
