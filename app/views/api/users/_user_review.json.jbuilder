json.extract!(
  review,
  :id,
  :title,
  :body,
  :grade,
  :created_at,
  :updated_at,
  :author_id
)
json.set! :author_name, author_name
json.set! :movie, review.movie
json.set! :poster, review.movie.posters.first
