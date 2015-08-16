json.extract!(
  review,
  :title,
  :body,
  :grade,
  :updated_at,
  :author_id
)

json.set! :author_name, review.author.username
json.set! :num_likes, review.likes.count
