json.array! @movies do |movie|
  json.partial! 'intro_index', movie: movie, display_images: true, display_reviews: true
end
