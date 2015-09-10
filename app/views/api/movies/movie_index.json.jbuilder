json.array! @movies do |movie|
  reviews = movie.reviews
  votes = movie.vote_count + movie.reviews.count
  vote_score = (movie.vote_average * movie.vote_count +
                reviews.sum(:grade) + reviews.count) / votes
  json.partial! 'movie_show',
                movie: movie,
                config: @config,
                score: vote_score,
                votes: votes,
                display_score: true,
                display_images: true,
                display_reviews: false,
                display_posters: true,
                display_actors: false,
                display_genres: false,
                display_user: false
end
