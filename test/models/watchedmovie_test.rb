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

require 'test_helper'

class WatchedmovieTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
