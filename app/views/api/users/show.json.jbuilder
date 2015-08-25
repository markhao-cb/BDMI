json.extract! @user, :username

json.reviews do
  json.array! @user.reviews.includes(:movie, :author) do |review|
    json.partial! 'user_review', review: review, author_name: @user.username
  end
end

json.watched_movies do
  json.array! @user.watched_movies.includes(:posters) do |movie|
    json.partial! 'user_movie', movie: movie
  end
end

json.wanted_movies do
  json.array! @user.wanted_movies.includes(:posters) do |movie|
    json.partial! 'user_movie', movie: movie
  end
end
