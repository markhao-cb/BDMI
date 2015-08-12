BDMI.Views.Main = Backbone.CompositeView.extend({
  template: JST['main'],

  className: "main_container group",

  initialize: function() {
    this.addContentView();
    this.addSidebarView();
  },

  addContentView: function() {
    var subview = new BDMI.Views.Content({ collection:this.collection });
    this.addSubview('#content',subview);
  },

  addSidebarView: function() {
    var subview = new BDMI.Views.Sidebar({ collection:this.collection });
    this.addSubview('#sidebar',subview);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
