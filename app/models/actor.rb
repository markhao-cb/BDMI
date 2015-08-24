# == Schema Information
#
# Table name: actors
#
#  id             :integer          not null, primary key
#  name           :string           not null
#  place_of_birth :string
#  birthday       :date
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  biography      :text
#

class Actor < ActiveRecord::Base
  validates :name, presence: true

  has_many :castings
  has_many :movies, through: :castings
  has_many :images, as: :imageable
  has_many :likes, as: :likeable

  Tmdb::Api.key(ENV['THEMOVIEDB_API_KEY'])

  def self.search_actors_by_name(name)
    Tmdb::Person.find(name)
  end

  def self.search_credits(id)
    Tmdb::Person.credits(id)
  end

  def self.search_and_store_by_id(id)
    auth = {
      cloud_name: ENV['CLOUD_NAME'],
      api_key: ENV['CLOUD_API_KEY'],
      api_secret: ENV['CLOUD_API_SECRET'],
      upload_preset: ENV['UPLOAD_PRESET']
    }
    config = Tmdb::Configuration.new

    person = Tmdb::Person.detail(id)

    actor = Actor.find_by(id: person['id'])
    if actor.nil?
      new_actor = Actor.create!(
                  id: person['id'],
                  name: person['name'],
                  place_of_birth: person['place_of_birth'],
                  birthday: person['birthday'],
                  biography: person['biography']
      )

      profile_path = "#{config.base_url}original#{person['profile_path']}"
      profile = Cloudinary::Uploader.upload(profile_path, auth)
      image_url = profile['url']

      new_actor.images.create!(image_url: image_url)
    else
      actor.update(biography: person['biography'])
    end
  end
end
