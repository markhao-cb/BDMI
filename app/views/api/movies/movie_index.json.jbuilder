json.array! @movies do |movie|
  json.partial! 'movie_index', movie: movie, display_images: true, display_reviews: true, display_posts: true
end
