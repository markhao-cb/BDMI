Tmdb::Api.key(ENV['THEMOVIEDB_API_KEY'])
auth = {
  cloud_name: ENV['CLOUD_NAME'],
  api_key: ENV['CLOUD_API_KEY'],
  api_secret: ENV['CLOUD_API_SECRET'],
  upload_preset: ENV['UPLOAD_PRESET']
};

#-------------------------Genres---------------------------
genres = Tmdb::Genre.list["genres"]
genres.each do |genre|
  id = genre["id"]
  name = genre["name"]
  Genre.create(id:id, name:name)
end

in_theaters_movies = Tmdb::Movie.now_playing # API called here !!

config = Tmdb::Configuration.new

#-------------------------Movies---------------------------
in_theaters_movies.each do |m|
  movie = Tmdb::Movie.detail(m["id"])
  id = movie["id"]
  title = movie["title"]
  release_date = movie["release_date"]
  vote_average = movie["vote_average"]
  vote_count = movie["vote_count"]
  popularity = movie["popularity"]
  overview = movie["overview"]
  runtime = movie["runtime"]
  imdb_id = movie["imdb_id"]
  tagline = movie["tagline"]
  budget = movie["budget"]
  revenue = movie["revenue"]

  backdrop_path = "#{config.base_url}original#{movie["backdrop_path"]}"
  backdrop = Cloudinary::Uploader.upload(backdrop_path,auth)
  image_url = backdrop["url"]
  poster_path = "#{config.base_url}original#{movie["poster_path"]}"
  poster = Cloudinary::Uploader.upload(poster_path,auth)
  poster_url = poster["url"]


  newMovie = Movie.create(
              id: id,
              title: title,
              release_date: release_date,
              vote_average: vote_average,
              vote_count: vote_count,
              popularity: popularity,
              overview: overview,
              runtime: runtime,
              imdb_id: imdb_id,
              tagline: tagline,
              budget: budget,
              revenue: revenue
            )


#---------------------------Taggings---------------------------


  movie["genres"].each do |genre|
    genre_id = genre["id"]
    Tagging.create(genre_id:genre_id, movie_id:movie["id"])
  end


#---------------------------Images---------------------------

  newMovie.posters.create(poster_url:poster_url)
  newMovie.images.create(image_url:image_url)
end



#---------------------------Actors---------------------------

  Movie.all.each do |dbmovie|
    Tmdb:Movie.casts(dbmovie.id)
  end
