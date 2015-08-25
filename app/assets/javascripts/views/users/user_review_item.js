BDMI.Views.UserPageReviewItem = Backbone.CompositeView.extend({
  template: JST['users/user_review_item'],

  className: "review-item-user group",

  events: {
    "click #user-review-movie": "handleClick"
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.addReviewView(this.model);
    this.poster_url = this.model.attributes.poster.poster_url;
  },

  addReviewView: function(review) {
    var subview = new BDMI.Views.Review({ model: review });
    this.addSubview("#user-review-content", subview);
  },

  render: function() {
    var content = this.template({
      poster_url: this.poster_url
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  handleClick: function() {
    window.scrollTo(0,0);
    Backbone.history.navigate('movies/'+this.model.attributes.movie.id, { trigger: true });
  }
});
