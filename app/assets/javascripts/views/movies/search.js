BDMI.Views.Search = Backbone.CompositeView.extend({
  template: JST['movie/search'],

  className: "search-section",

  events: {
    "submit form": "search"
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  search: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON().search;
    if (formData[0].length < 2) {
      this.flashAlert(["Too short! Please be more specific."]);
    } else {
      if (formData[1] === "movie") {
        Backbone.history.navigate("search/movies/"+formData[0], { trigger: true });
      } else {
        var searchPerson = new BDMI.Models.Actor({
          name: formData[0]
        });
      }
    }
  },

  flashAlert: function(messages) {
    var alertView = new BDMI.Views.AlertView({
      messages: messages
    });
    $('body').append(alertView.$el);
    alertView.render();
    alertView.$(".alert").addClass('animated fadeIn');
    setTimeout(function() {
      alertView.$(".alert").removeClass('fadeIn');
      alertView.$(".alert").addClass('fadeOut');
      alertView.$(".alert").one("webkitAnimationEnd", function() {
        alertView.remove();
      });
    },2000);
  }
});
