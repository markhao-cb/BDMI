BDMI.Views.Review = Backbone.View.extend({
  template: JST['reviews/review'],

  className: "review-section-item",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  getTimeAgo: function(){
    return $.timeago(this.model.get('created_at'));
  },

  render: function() {
    var content = this.template({
      review: this.model,
      timeAgo: this.getTimeAgo()
    });
    this.$el.html(content);
    this.onRender();
    return this;
  },
  onRender: function() {
    this.$('#star').raty('destroy');
    var grade = this.model.attributes.grade / 2;
    this.$('#star').raty({
      starOff: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-off_j7trzb.png",
      starOn: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-on_iezcg6.png",
      starHalf: "http://res.cloudinary.com/dypfv4yqq/image/upload/v1439888579/star-half_w79ezb.png",
      helf: true,
      score: grade,
      readOnly: true
    });
  }
});
