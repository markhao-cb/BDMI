# == Schema Information
#
# Table name: wantwatchmovies
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  movie_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Wantwatchmovie < ActiveRecord::Base
end
