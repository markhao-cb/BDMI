BDMI.Views.ReviewForm = Backbone.View.extend({
  template: JST['reviews/review_form'],

  className: "review-form group",

  events: {
    "click #create-btn": "postReview",
    'click .my-background': 'handleRemove',
    'click .close-form': 'removeBtn',
    'click #cancel-btn': 'removeBtn'
  },

  initialize: function(options) {
     $(document).on('keyup', this.handleKey.bind(this));
     this.model = new BDMI.Models.Review();
     debugger
     //todo pass movie in as an option
     this.movie = options.movie;
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.$el.addClass('animated rollOut');
      this.$el.one('webkitAnimationEnd', function() {
        this.remove();
      }.bind(this));
    }
  },

  handleRemove: function (event) {
      this.$el.addClass('animated fadeOutDown');
      this.$el.one('webkitAnimationEnd', function() {
        this.remove();
      }.bind(this));
  },

  removeBtn: function (event) {
    event.preventDefault();
    this.$el.addClass('animated rollOut');
    this.$el.one('webkitAnimationEnd', function() {
      this.remove();
    }.bind(this));
  },

  render: function() {
    var content = this.template({ review: this.model });
    this.$el.html(content);
    this.onRender();
    return this;
  },

  onRender: function() {
    this.$('#star').raty('destroy');
    this.$('#star').raty({
      path: "/assets/",
      helf: true,
      score: 0,
      scoreName:"review[grade]"
    });
  },

  postReview: function(event) {
    event.preventDefault();
    var formdata = $("#review-form").serializeJSON().review;
    formdata.grade *= 2;
    debugger
    formdata.movie_id = this.movie.id;
    this.model.save(formdata, {
      success: function() {
        this.collection.add(this.model);
        this.$el.addClass('animated zoomOutup');
        this.$el.one('webkitAnimationEnd', function() {
          this.remove();
        }.bind(this));
      }.bind(this)
    });
  },

  // TODO save data for later
  saveForLater: function(event) {
    event.preventDefault();
    var formdata = $("#review-form").serializeJSON().review;
    this.model.set(formdata);
    this.$el.addClass('animated zoomOutDown');
    this.$el.one('webkitAnimationEnd', function() {
      this.remove();
    }.bind(this));
  }
});
