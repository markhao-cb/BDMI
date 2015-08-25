BDMI.Views.UserWatchList = Backbone.CompositeView.extend({
  template: JST['users/user_watchlist'],

  className: 'group',

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addWatchlistItem);
    this.collection.each(this.addWatchlistItem.bind(this));
  },

  addWatchlistItem: function(movie) {
    var subview = new BDMI.Views.InTheatersItem({ model: movie });
    this.addSubview('.all-watchlist', subview);
  },

  render: function() {
    var content = this.template();
    if (this.collection.length === 0) {
      content = "<h4 class='no-review user-no'>Your watchlist is empty.</h4>";
    }
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
