# == Schema Information
#
# Table name: actors
#
#  id             :integer          not null, primary key
#  name           :string           not null
#  place_of_birth :string           not null
#  birthday       :date             not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class ActorTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
