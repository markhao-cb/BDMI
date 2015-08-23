# == Schema Information
#
# Table name: posters
#
#  id         :integer          not null, primary key
#  poster_url :string           not null
#  movie_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Poster < ActiveRecord::Base
  validates :poster_url, :movie, presence: true
  belongs_to :movie
end
