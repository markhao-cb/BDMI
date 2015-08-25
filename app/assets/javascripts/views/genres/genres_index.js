BDMI.Views.GenresIndex = Backbone.CompositeView.extend({
  template: JST['genres/genres_index'],

  events: {
    "click #sort_by_date":"sort_by_date",
    "click #sort_by_rating":"sort_by_rating",
    "click #sort_by_count":"sort_by_count",
    "click .btn": "handleRedirect"
  },

  initialize: function(options) {
    this.firstItem = true;
    this.genres = [];
    this.addLoadingView();
    this.addPageScrollAnimation();
    this.genre = options.genre;
    if(this.genre === "all") {
      this.notChoose = true;
    } else {
      this.notChoose = false;
    }
    this.collection.fetch({
      data:{
        genre: this.genre
      },
      processData:true,
      success: function(collection) {
        this.genres = this.collection.first().attributes.genres;
      }.bind(this),
      error: function(collection, error) {
        debugger
      }
    });
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    if (this.notChoose) {
      var content = this.template({
        genres: this.genres,
        notChoose: this.notChoose
      })
      this.$el.html(content);
      $(".wrap_body").remove();
    } else {
      var content = this.template({
        keyword: this.genre,
        section: "genres",
        genres : this.genres,
        notChoose: this.notChoose
      });
      this.$el.html(content);
      if (_.size(this.collection) !== 0) {
        var filtered = _.filter(this.collection.models, function(model) {
          return model.escape("release_date") !== "" &&
                 model.escape("vote_count") > 2;
        });
        this.collection = new BDMI.Collections.Genres(filtered);
        this.collection.each(this.addResultView.bind(this));
        this.generatePagination();
        this.addButtonActive();
        $(".wrap_body").remove();
      }
      this.attachSubviews();
    }
    return this;
  },

  handleRedirect: function(event) {

  },

  addResultView: function(result) {
    if (this.firstItem) {
      var firstSubview = new BDMI.Views.FirstResultView({ model: result });
      this.addSubview("#results-section", firstSubview);
      this.firstItem = false;
    } else {
      var subview = new BDMI.Views.ResultsItem({ model: result });
      this.addSubview("#results-section",subview);
    }
  },

  insertModelToSubviews: function(reverse) {
    var modelArr = _.toArray(this.collection.models);
    if (reverse) {
      modelArr = modelArr.reverse();
    }
    var subviews = _.toArray(this.subviews("#results-section")._wrapped);
    for (var i = 0; i < modelArr.length; i++) {
      subviews[i].model = modelArr[i];
      subviews[i].render();
    }
  },

  generatePagination: function() {
    $('#pagination-genres').twbsPagination({
        totalPages: 96,
        visiblePages: 8,
        onPageClick: function (event, page) {
          this.collection.fetch({
            data: {
              page:page
            },
            processData:true,
            success: function() {
              window.scrollTo(0, 0);
              this.insertModelToSubviews(false);
              $(".wrap_body").remove();
            }.bind(this)
          });
          this.addLoadingView();
        }.bind(this)
    });
  },

  sort_by_date: function(event) {
    this.$("#sort-section .btn").removeClass('active');
    $(event.currentTarget).addClass('active');
    this.collection.comparator = "release_date";
    this.collection.sort();
    this.insertModelToSubviews(true);
  },

  sort_by_count: function(event) {
    this.$("#sort-section .btn").removeClass('active');
    $(event.currentTarget).addClass('active');
    this.collection.comparator = "vote_count";
    this.collection.sort();
    this.insertModelToSubviews(true);
  },

  sort_by_rating: function(event) {
    this.$("#sort-section .btn").removeClass('active');
    $(event.currentTarget).addClass('active');
    this.collection.comparator = "vote_average";
    this.collection.sort();
    this.insertModelToSubviews(true);
  },

  addLoadingView: function() {
    this.loadingView = new BDMI.Views.LoadingView();
    $("body").append(this.loadingView.render().$el);
  },

  addButtonActive: function() {
    var currentGenre = Backbone.history.fragment.slice(7);
    if (currentGenre === "Science Fiction") {
      this.$(".Science.Fiction").addClass('active');
    } else {
      this.$("#all-genres-section .active").removeClass('active');
      this.$("#all-genres-section ." + currentGenre).addClass('active');
    }
  },

  addPageScrollAnimation: function() {
    $('a.page-scroll').bind('click', function(event) {
        if(Backbone.history.getFragment() !== "" &&
          !$(event.currentTarget).hasClass('user_login')) {
          Backbone.history.navigate("", { trigger: true });
        }
        var $anchor = $(this);
        if ($($anchor.attr('href')) !== []) {
          $('html, body').stop().animate({
              scrollTop: $($anchor.attr('href')).offset().top
          }, 1500, 'easeInOutExpo');
        }
        event.preventDefault();
    });
  }
});
