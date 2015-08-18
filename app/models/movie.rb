class Movie < ActiveRecord::Base
  validates :title, :yr, :score, :votes, presence: true

  has_many :reviews
  has_many :images, as: :imageable
  has_many :likes, as: :likeable
  has_many :posts
  has_many :castings
  has_many :actors, through: :castings
  has_many :taggings
  has_many :genres, through: :taggings
  belongs_to :director, foreign_key: :director_id, class_name: :Actor

  def update_score_and_num_of_votes(score)
    all_scores = self.score * (self.votes + self.reviews.count) + score
    score = all_scores / (self.votes + self.reviews.count)
  end
end
