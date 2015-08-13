
json.extract!(
  review,
  :title,
  :body,
  :grade,
  :author_id
)

json.set! :author_name, review.author.username
