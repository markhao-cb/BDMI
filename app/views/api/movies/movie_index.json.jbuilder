json.array! @movies do |movie|
  json.partial! 'movie_show',
                movie: movie,
                display_images: true,
                display_reviews: false,
                display_posters: true,
                display_actors: false
end
