# == Schema Information
#
# Table name: castings
#
#  id         :integer          not null, primary key
#  movie_id   :integer
#  actor_id   :integer
#  ord        :integer
#  act_as     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Casting < ActiveRecord::Base
  belongs_to :actor
  belongs_to :movie
end
