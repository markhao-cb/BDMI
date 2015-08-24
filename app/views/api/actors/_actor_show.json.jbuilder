json.extract!(actor, :name, :birthday, :place_of_birth, :biography)

if display_images
  json.images do
    json.array! actor.images do |image|
      json.partial! 'api/movies/image', image: image
    end
  end
end

if display_movies
  json.credits do
    json.array! credits do |movie|
      unless movie['poster_path'].nil? || movie['media_type'] != 'movie'
        json.extract!(
          movie,
          'id',
          'character',
          'title',
          'release_date',
          'poster_path'
        )
        json.extract!(config, :base_url)
      end
    end
  end
end
