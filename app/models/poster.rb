class Poster < ActiveRecord::Base
  validates :poster_url, :movie, presence: true
  belongs_to :movie
end
