Tmdb::Api.key(ENV['THEMOVIEDB_API_KEY'])
auth = {
  cloud_name: ENV['CLOUD_NAME'],
  api_key: ENV['CLOUD_API_KEY'],
  api_secret: ENV['CLOUD_API_SECRET'],
  upload_preset: ENV['UPLOAD_PRESET']
};
config = Tmdb::Configuration.new

#-------------------------Genres---------------------------
# genres = Tmdb::Genre.list["genres"]
# genres.each do |genre|
#   id = genre["id"]
#   name = genre["name"]
#   Genre.create(id:id, name:name)
# end

in_theaters_movies = Tmdb::Movie.now_playing # API called here !!
top_rated_movies = Tmdb::Movie.top_rated

#-------------------------Movies---------------------------
in_theaters_movies.each do |m|
  unless Movie.find_by(id: m["id"])
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

    unless movie['backdrop_path'].nil? || movie['poster_path'].nil? ||
           vote_count == 0 || release_date.nil?

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

      casts = Tmdb::Movie.casts(newMovie.id)
      casts.each do |actor|

        if actor["order"] < 11
          person = Tmdb::Person.detail(actor["id"])

          if person["profile_path"] != nil

            if Actor.find_by(id:person["id"]) == nil
              newActor = Actor.create!(
                            id:person["id"],
                            name:person["name"],
                            place_of_birth:person["place_of_birth"],
                            birthday:person["birthday"]
                          )

              profile_path = "#{config.base_url}original#{person["profile_path"]}"
              profile = Cloudinary::Uploader.upload(profile_path,auth)
              image_url = profile["url"]

              newActor.images.create!(image_url:image_url)
            end

            Casting.create!(
              actor_id:person["id"],
              movie_id:newMovie.id,
              ord: actor["order"],
              act_as: actor["character"]
            )
          end
        end
      end
    end
  end
end

top_rated_movies.take(10).each do |m|
  unless Movie.find_by(id: m["id"])
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

    unless movie['backdrop_path'].nil? || movie['poster_path'].nil? ||
           vote_count == 0 || release_date.nil?

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

      casts = Tmdb::Movie.casts(newMovie.id)
      casts.each do |actor|

        if actor["order"] < 11
          person = Tmdb::Person.detail(actor["id"])

          if person["profile_path"] != nil

            if Actor.find_by(id:person["id"]) == nil
              newActor = Actor.create!(
                            id:person["id"],
                            name:person["name"],
                            place_of_birth:person["place_of_birth"],
                            birthday:person["birthday"]
                          )

              profile_path = "#{config.base_url}original#{person["profile_path"]}"
              profile = Cloudinary::Uploader.upload(profile_path,auth)
              image_url = profile["url"]

              newActor.images.create!(image_url:image_url)
            end

            Casting.create!(
              actor_id:person["id"],
              movie_id:newMovie.id,
              ord: actor["order"],
              act_as: actor["character"]
            )
          end
        end
      end
    end
  end
end



#---------------------------Actors---------------------------

# Movie.all.each do |dbmovie|
  #casts = Tmdb::Movie.casts(dbmovie.id)
  # casts.each do |actor|
  #
  #   if actor["order"] < 11
  #     person = Tmdb::Person.detail(actor["id"])
  #
  #     if person["profile_path"] != nil
  #
  #       if Actor.find_by(id:person["id"]) == nil
  #         newActor = Actor.create!(
  #                       id:person["id"],
  #                       name:person["name"],
  #                       place_of_birth:person["place_of_birth"],
  #                       birthday:person["birthday"]
  #                     )
  #
  #         profile_path = "#{config.base_url}original#{person["profile_path"]}"
  #         profile = Cloudinary::Uploader.upload(profile_path,auth)
  #         image_url = profile["url"]
  #
  #         newActor.images.create!(image_url:image_url)
  #       end
  #
  #       Casting.create!(
  #         actor_id:person["id"],
  #         movie_id:dbmovie.id,
  #         ord: actor["order"],
  #         act_as: actor["character"]
  #       )
  #     end
  #   end
  # end
# end
