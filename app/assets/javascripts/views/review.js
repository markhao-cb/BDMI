BDMI.Views.Review = Backbone.View.extend({
  template: JST['review'],

  className: "review-section-item",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ review: this.model });
    this.$el.html(content);
    this.generateStars();
    return this;
  },

  generateStars: function() {
        this.$('.small-review-grade').empty();
        var grade = this.model.attributes.grade / 2;
        // var grade = 5;
        var star = Math.max(0, (Math.min(5, grade)));
        var blank = 5 - star;
        while (star > 0) {
          var $star = $("<span></span>");
          $star.text("★");
          this.$('.small-review-grade').append($star);
          star--;
        }
        while (blank > 0) {
          var $blank = $("<span></span>");
          $blank.text("☆");
          this.$('.small-review-grade').append($blank);
          blank--;
        }
      }
});
