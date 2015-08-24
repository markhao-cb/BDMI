BDMI.Collections.MovieActors = Backbone.Collection.extend({
  url: "/api/actors",

  model: BDMI.Models.MovieActor,

  getOrFetch: function(id) {
    var actor = this.get(id);
    if (!actor) {
      actor = new BDMI.Models.MovieActor({ id: id });
      this.add(actor);
      var actors = this;
      actor.fetch({
        error: function() {
          actors.remove(actor);
        }
      });
    } else {
      actor.fetch();
    }
    return actor;
  }

});
