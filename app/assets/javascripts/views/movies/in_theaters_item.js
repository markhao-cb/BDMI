BDMI.Views.InTheatersItem = Backbone.CompositeView.extend({
  template: JST['movie/in_theaters_item'],

  className: "in_theaters_item",

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    debugger
    var content = this.template({ movie: this.model });
    this.$el.html(content);
    return this;
  }
});
