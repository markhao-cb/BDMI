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

require 'test_helper'

class TrailerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
