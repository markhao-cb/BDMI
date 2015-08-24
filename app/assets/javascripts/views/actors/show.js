BDMI.Views.ActorShow = Backbone.CompositeView.extend({
  template: JST['actors/show'],

  className: "actor-show container group",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.generateSubviews);
    this.listenTo(this.model, 'sync', this.render);
    this.addLoadingView();
  },

  generateSubviews: function() {
    this.addInfoView();
    this.addCastView();
    $(".wrap_body").remove();
  },

  addInfoView: function() {
    var subview = new BDMI.Views.ActorInfoView({ model: this.model });
    this.addSubview("#info-section", subview);
  },

  addCastView: function() {
    var subview = new BDMI.Views.Casts({ collection: this.model.credits() });
    this.addSubview("#cast-section", subview);
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
  },

  addLoadingView: function() {
    this.loadingView = new BDMI.Views.LoadingView();
    $("body").append(this.loadingView.render().$el);
  }
});
