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
    if (formData[1].length < 2) {
      this.flashAlert(["Too short! Please be more specific."]);
    } else {
      if (formData[0] === "movie") {
        Backbone.history.navigate("search/movies/"+formData[1], { trigger: true });
      } else {
        Backbone.history.navigate("search/person/"+formData[1], { trigger: true });
      }
    }
  },

  registerSearchListener: function() {
    var typingTimer;                //timer identifier
    var doneTypingInterval = 500;  //time in ms, 0.5 seconds
    var $input = this.$('#myInput');
    //on keyup, start the countdown
    $input.on('paste keyup', function() {
      $('.search_dropdown_section').remove();
      clearTimeout(typingTimer);
      if ($input.val() !== "") {
        typingTimer = setTimeout(this.doneTyping.bind(this), doneTypingInterval);
      }
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
    var formData = this.$('form').serializeJSON().search;
    if (formData[0] === "movie") {
      this.movieSearchDrop(formData[1]);
    } else {
      this.persionSearchDrop(formData[1]);
    }
  },

  movieSearchDrop: function(title) {
    var searchedMovies = new BDMI.Collections.SearchedMovies();
    searchedMovies.fetch({
      data: {
        title:title
      },
      processData: true,
      success: function(collection) {
        if (collection.length === 0) {
          $('.search_dropdown_section').remove();
        }
      }.bind(this)
    });
    var dropDownView = new BDMI.Views.SearchDropDown({
      collection: searchedMovies,
      type: 'movie'
    });
    this.addSubview('#dropdown',dropDownView);
  },

  persionSearchDrop: function(name) {
    var searchedPerson = new BDMI.Collections.MovieActors();
    var person = searchedPerson.fetch({
      data: {
        name: name
      },
      processData: true,
      success: function(collection) {
        if (collection.length === 0) {
          $('.search_dropdown_section').remove();
        }
      }.bind(this)
    });
    var dropDownView = new BDMI.Views.SearchDropDown({
      collection: searchedPerson,
      type: 'person'
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
