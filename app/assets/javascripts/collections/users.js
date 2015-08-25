BDMI.Collections.Users = Backbone.Collection.extend({
  url: '/api/users',

  model: BDMI.Models.User,

  getOrFetch: function(id) {
    var user = this.get(id);
    if (!user) {
      user = new BDMI.Models.User({ id:id });
      this.add(user);
      var users = this;
      user.fetch({
        error: function() {
          users.remove(user);
        }
      });
    } else {
      user.fetch();
    }
    return user;
  }
});
