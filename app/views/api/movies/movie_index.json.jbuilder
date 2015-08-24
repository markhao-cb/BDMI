json.array! @movies do |movie|
  json.partial! 'movie_show',
                movie: movie,
                config: @config,
                display_images: true,
                display_reviews: false,
                display_posters: true,
                display_actors: false,
                display_genres: false,
                display_user: false
end
