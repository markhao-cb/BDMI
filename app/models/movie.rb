# == Schema Information
#
# Table name: movies
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  release_date :date
#  runtime      :integer
#  vote_average :float
#  vote_count   :integer
#  popularity   :float
#  overview     :text
#  imdb_id      :string
#  revenue      :integer
#  tagline      :string
#  budget       :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Movie < ActiveRecord::Base
  validates :title, presence: true

  has_many :reviews
  has_many :images, as: :imageable
  has_many :likes, as: :likeable
  has_many :posters
  has_many :castings
  has_many :actors, through: :castings
  has_many :taggings
  has_many :genres, through: :taggings
  belongs_to :director, foreign_key: :director_id, class_name: :Actor

  Tmdb::Api.key(ENV['THEMOVIEDB_API_KEY'])



  def update_score_and_num_of_votes(score)
    all_scores = self.vote_average * (self.vote_count + self.reviews.count) + score
    score = all_scores / (self.vote_count + self.reviews.count)
  end

  def self.search_by_title(title)
    Tmdb::Movie.find(title)
  end

  def self.find_config
    Tmdb::Configuration.new
  end

  def self.create_new_movie(id)
    # # movies.each do |movie|
    #   if Movie.find_by(id: movie.id).nil?
    #     self.create_new_movie(movie.id)
    #   end
    # # end
    # movies
    auth = {
      cloud_name: ENV['CLOUD_NAME'],
      api_key: ENV['CLOUD_API_KEY'],
      api_secret: ENV['CLOUD_API_SECRET'],
      upload_preset: ENV['UPLOAD_PRESET']
    };
    config = Tmdb::Configuration.new
    movie = Tmdb::Movie.detail(id)
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

    movie["genres"].each do |genre|
      genre_id = genre["id"]
      Tagging.create(genre_id:genre_id, movie_id:movie["id"])
    end

    unless movie["backdrop_path"].nil?
      backdrop_path = "#{config.base_url}original#{movie["backdrop_path"]}"
      backdrop = Cloudinary::Uploader.upload(backdrop_path,auth)
      image_url = backdrop["url"]
      newMovie.images.create(image_url:image_url)
    end

    unless movie["poster_path"].nil?
      poster_path = "#{config.base_url}original#{movie["poster_path"]}"
      poster = Cloudinary::Uploader.upload(poster_path,auth)
      poster_url = poster["url"]
      newMovie.posters.create(poster_url:poster_url)
    end


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


  def self.getData
    config = Tmdb::Configuration.new
  end

  def self.getacData
    Tmdb::Person.detail(500)
  end


  def self.upload
    auth = {
      cloud_name: ENV['CLOUD_NAME'],
      api_key: ENV['CLOUD_API_KEY'],
      api_secret: ENV['CLOUD_API_SECRET'],
      upload_preset: ENV['UPLOAD_PRESET']
    };
    a = Cloudinary::Uploader.upload("http://cf2.imgobject.com/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg", auth)
  end

  def self.get_in_theathers_data
    Tmdb::Movie.now_playing
  end
end
