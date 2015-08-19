json.extract!(
  movie,
  :id,
  :title,
  :release_date,
  :vote_average,
  :vote_count,
  :popularity,
  :revenue,
  :runtime,
  :overview,
  :budget,
  :tagline,
  :imdb_id,
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

if display_posters
  json.posters do
    json.array! movie.posters do |poster|
      json.partial! 'api/movies/poster', poster: poster
    end
  end
end

if display_actors
  json.actors do
    json.array! movie.actors.includes(:images).includes(:likes) do |actor|
      json.partial! 'api/actors/actor', actor: actor, display_images: true
    end
  end
end

if display_genres
  json.genres do
    json.array! movie.genres do |genre|
      json.partial! 'api/genres/genre', genre: genre
    end
  end
end
