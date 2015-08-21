class Trailer < ActiveRecord::Base
  validates :source, :movie, presence: true
  validates :movie, uniqueness: true

  belongs_to :movie
end
