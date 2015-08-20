json.array! @movies do |movie|
  json.extract!(
    movie,
    :id,
    :title,
    :release_date,
    :vote_average,
    :vote_count,
    :popularity,
    :poster_path,
    :overview
  )
  json.extract!(@config, :base_url)
end
