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

json.set! :poster, movie.posters.first
