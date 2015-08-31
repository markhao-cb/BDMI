BDMI.Views.Search = Backbone.CompositeView.extend({
  template: JST['movie/search'],

  className: "search-section",

  events: {
    "submit form": "search"
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.registerSearchListener();
    this.attachSubviews();
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
        Backbone.history.navigate("search/person/"+formData[0], { trigger: true });
      }
    }
  },

  registerSearchListener: function() {
    var typingTimer;                //timer identifier
    var doneTypingInterval = 3000;  //time in ms, 3 seconds
    var $input = this.$('#myInput');
    //on keyup, start the countdown
    $input.on('paste keypress', function() {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
    }.bind(this));
  },

  getSelectionText: function() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
  },

  doneTyping: function() {
    var formData = this.$('form').serilizeJSON().search;
    if (formData[1] === "movie") {
      this.movieSearchDrop(formData[0]);
    } else {
      Backbone.history.navigate("search/person/"+formData[0], { trigger: true });
    }
  },

  movieSearchDrop: function(title) {
    var searchedMovies = new BDMI.Collections.SearchedMovies();
    var searchedMovie = searchedMovies.fetch({
      data: {
        title:title
      },
      processData: true,
      success: function(collection) {
      }.bind(this)
    });
    var dropDownView = new BDMI.Views.SearchDropDown({
      collection: searchedMovies
    });
    this.addSubview('#dropdown',dropDownView);
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
