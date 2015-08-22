# == Schema Information
#
# Table name: watchedmovies
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  movie_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Watchedmovie < ActiveRecord::Base
  validates :user, :movie, presence: true

  belongs_to :user
  belongs_to :movie
end
