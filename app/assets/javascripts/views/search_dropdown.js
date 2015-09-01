BDMI.Views.SearchDropDown = Backbone.CompositeView.extend({
  template: JST['movie/search_dropdown'],

  className: 'search_dropdown_section',

  initialize: function(options) {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addDropDownItem);
    this.collection.each(this.addDropDownItem.bind(this));
    this.count = 0;
    this.type = options.type;
  },

  addDropDownItem: function(model) {
    if(this.count < 5) {
      var subview = new BDMI.Views.SearchDropDownItem({
        model: model,
        type: this.type
      });
      this.addSubview('#dropdown-index', subview);
      this.count += 1;
    }
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
