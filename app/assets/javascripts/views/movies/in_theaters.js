BDMI.Views.InTheaters = Backbone.CompositeView.extend({
  template: JST['movie/in_theaters'],

  className: "in-theaters-section",

  events: {
    "click #load-more-in-theaters": "loadMore"
  },

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
  },

  loadMore: function(event) {
    this.page += 1;
    this.fetchReview();
  },

  fetchReview: function() {
    this.collection.fetch({
      data: {
        page: this.page,
        movie_id: this.movie.id
      },
      processData: true,
      success: function(resp) {
        if (resp.length < 8 && this.page != 1) {
          this.flashAlert("no_more",["No more movies!"]);
          this.page -= 1;
        }
      }.bind(this)
    });
  }
});
