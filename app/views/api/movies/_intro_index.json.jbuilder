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
    json.array! movie.reviews do |review|
      json.partial! 'api/movies/review', review: review
    end
  end
end
