BDMI.Views.UserWatchedList = Backbone.CompositeView.extend({
  template: JST['users/user_watched_list'],

  className: 'group',

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addWatchedItem);
    this.collection.each(this.addWatchedItem.bind(this));
  },

  addWatchedItem: function(movie) {
    var subview = new BDMI.Views.InTheatersItem({ model: movie });
    this.addSubview('.all-watched', subview);
  },

  render: function() {
    var content = this.template();
    if (this.collection.length === 0) {
      content = "<h4 class='no-review user-no'>You don't have any watched movies.</h4>";
    }
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
