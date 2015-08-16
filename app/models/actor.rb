class Actor < ActiveRecord::Base
  validates :name, presence: true

  has_many :castings
  has_many :movies, through: :castings
  has_many :images, as: :imageable
  has_many :likes, as: :likeable
  has_many :directed_movies, foreign_key: :director_id, class_name: :Movie
end
