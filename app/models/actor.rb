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
end
