# == Schema Information
#
# Table name: trailers
#
#  id         :integer          not null, primary key
#  source     :string           not null
#  movie_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Trailer < ActiveRecord::Base
  validates :source, :movie, presence: true
  validates :movie, uniqueness: true

  belongs_to :movie
end
