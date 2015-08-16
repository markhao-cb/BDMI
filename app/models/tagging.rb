class Tagging < ActiveRecord::Base
  validates :movie, :genre, presence: true
  belongs_to :movie
  belongs_to :genre
end
