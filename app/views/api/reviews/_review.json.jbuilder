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

json.set! :author_name, review.author.username
json.set! :num_likes, review.likes.count
