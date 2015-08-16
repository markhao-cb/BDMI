class Genre < ActiveRecord::Base
  validates :name, presence: true
  has_many :taggings
  has_many :movies, through: :taggings
end
