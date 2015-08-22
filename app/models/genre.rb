# == Schema Information
#
# Table name: genres
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Genre < ActiveRecord::Base
  validates :name, presence: true
  has_many :taggings
  has_many :movies, through: :taggings

  Tmdb::Api.key(ENV['THEMOVIEDB_API_KEY'])

  def self.search_genre_detail_by_id(id)
    Tmdb::Genre.detail(id)
  end
end
