class Movie < ActiveRecord::Base
  validates :title, :yr, :score, :votes, :director, presence: true

  has_many :reviews
  has_many :images, as: :imageable
  has_many :likes, as: :likeable
  has_many :posts
  has_many :castings
  has_many :actors, through: :castings
  belongs_to :director, foreign_key: :director_id, class_name: :Actor
end
