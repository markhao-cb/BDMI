json.extract!(
  movie,
  :id,
  :title,
  :yr,
  :score,
  :votes,
  :director_id
)

if display_images
  json.images do
    json.array! movie.images do |image|
      json.partial! 'api/movies/image', image: image
    end
  end
end

if display_reviews
  json.reviews do
    json.array! movie.reviews.includes(:author).includes(:likes) do |review|
      json.partial! 'api/reviews/review', review: review
    end
  end
end

if display_posts
  json.posts do
    json.array! movie.posts do |post|
      json.partial! 'api/movies/post', post: post
    end
  end
end

if display_actors
  json.actor do
    json.array! movie.actors.includes(:images).includes(:likes) do |actor|
      json.partial! 'api/actors/actor', actor: actor, display_images: true
    end
  end
end
