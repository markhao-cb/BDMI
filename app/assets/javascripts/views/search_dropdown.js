BDMI.Views.SearchDropDown = Backbone.CompositeView.extend({
  template: JST['movie/search_dropdown'],

  className: 'search_dropdown_section',

  initialize: function() {
    this.listenTo(this.collection, 'add', this.addSubview);
    this.collection.each(this.addDropDownItem.bind(this));
    this.addDropDownItem();
  },

  addDropDownItem: function() {
    var subview = new BDMI.Views.SearchDropDownItem({ });
    this.addSubview('#dropdown-index', subview);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
