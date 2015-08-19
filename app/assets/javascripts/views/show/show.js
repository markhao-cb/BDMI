BDMI.Views.Movie = Backbone.CompositeView.extend({
  template: JST['movie/show'],

  className: "movie-show container group",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.generateSubviews);
    this.listenTo(this.model, 'sync', this.render);
  },

  generateSubviews: function() {
    debugger
    this.addInfoView();
    this.addActorView();
    this.addReviewView();
  },

  addInfoView: function() {
    var subview = new BDMI.Views.InfoView({ model: this.model });
    this.addSubview("#info-section", subview);
  },

  addActorView: function() {
    var subview = new BDMI.Views.Actors({ collection: this.model.actors() });
    this.addSubview("#actor-section", subview);
  },

  addReviewView: function() {
    var reviews = new BDMI.Collections.Reviews();
    var subview = new BDMI.Views.MovieReviews({
      collection: reviews,
      movie: this.model
    });
    this.addSubview("#review-section", subview);
  },

  render: function() {
    var content = this.template({ movie: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
