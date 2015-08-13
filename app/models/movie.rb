class Movie < ActiveRecord::Base
  validates :title, :yr, :score, :votes, :director_id, presence: true

  has_many :reviews
  has_many :images, as: :imageable
  has_many :likes, as: :likeable
end
