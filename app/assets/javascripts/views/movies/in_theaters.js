BDMI.Views.InTheaters = Backbone.CompositeView.extend({
  template: JST['movie/in_theaters'],

  className: "in-theaters-section",

  initialize: function() {
    this.page = 1;
    this.collection.fetch({
      data: { page: this.page },
      processData: true
    });
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addMovieView);
    this.collection.each(this.addMovieView.bind(this));
    this.listenTo(this.collection, 'remove', this.removeMovieView);
  },

  addMovieView: function(movie) {
    var subview = new BDMI.Views.InTheatersItem({ model: movie });
    this.addSubview(".in-theaters", subview);
  },

  render: function() {
    var indexContent = this.template();
    this.$el.html(indexContent);
    this.attachSubviews();
    return this;
  },

  removeMovieView: function(movie) {
    this.removeModelSubview(".in-theaters",movie);
  }
});
