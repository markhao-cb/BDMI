BDMI.Collections.Reviews = Backbone.Collection.extend({
  url: "/api/reviews",
  model: BDMI.Models.Review,
  comparator: "created_at"
});
