json.array! @movies do |movie|
  unless movie.poster_path.nil?
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
end
