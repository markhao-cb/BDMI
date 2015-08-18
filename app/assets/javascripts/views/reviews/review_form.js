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
     this.movie = options.movie;
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.$(".my-background").remove();
      this.$(".my-content").addClass('animated fadeOut');
      this.$(".my-content").one('webkitAnimationEnd', function() {
        this.remove();
      }.bind(this));
    }
  },

  handleRemove: function (event) {
    this.$(".my-background").remove();
      this.$(".my-content").addClass('animated fadeOut');
      this.$(".my-content").one('webkitAnimationEnd', function() {
        this.remove();
      }.bind(this));
  },

  removeBtn: function (event) {
    event.preventDefault();
    this.$(".my-background").remove();
    this.$(".my-content").addClass('animated rollOut');
    this.$(".my-content").one('webkitAnimationEnd', function() {
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
      starOff: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-off_j7trzb.png",
      starOn: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-on_iezcg6.png",
      starHalf: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-half_w79ezb.png",
      helf: true,
      score: 0,
      scoreName:"review[grade]"
    });
  },

  postReview: function(event) {
    event.preventDefault();
    var formdata = $("#review-form").serializeJSON().review;
    formdata.grade *= 2;
    formdata.movie_id = this.movie.id;
    this.model.save(formdata, {
      success: function() {
        this.model.attributes.author_name = BDMI.CURRENT_USER.username;
        this.collection.add(this.model);
        this.$(".my-background").remove();
        this.$(".my-content").addClass('animated zoomOutUp');
        this.$(".my-content").one('webkitAnimationEnd', function() {
          this.remove();
        }.bind(this));
      }.bind(this),
      error: function(model,error,options) {
        var messages = $.parseJSON(error.responseText);
        this.flashAlert("decline",messages);
      }.bind(this),
    });
  },

  // TODO save data for later
  saveForLater: function(event) {
    event.preventDefault();
    var formdata = $("#review-form").serializeJSON().review;
    this.model.set(formdata);
    this.$(".my-background").remove();
    this.$(".my-content").addClass('animated zoomOutDown');
    this.$(".my-content").one('webkitAnimationEnd', function() {
      this.remove();
    }.bind(this));
  },

  flashAlert: function(type, messages) {
    var alertView = new BDMI.Views.AlertView({
      alertType: type,
      messages: messages
    });
    $('body').append(alertView.$el);
    alertView.render();
    alertView.$(".alert").addClass('animated fadeIn');
    setTimeout(function() {
      alertView.$(".alert").removeClass('fadeIn');
      alertView.$(".alert").addClass('fadeOut');
      alertView.$(".alert").one("webkitAnimationEnd", function() {
        debugger
        alertView.remove();
      });
    },2000);
  }
});
