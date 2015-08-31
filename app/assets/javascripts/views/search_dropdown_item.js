BDMI.Views.SearchDropDownItem = Backbone.View.extend({
  template: JST['movie/search_dropdown_item'],

  className: 'search-dropdown-item',

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
