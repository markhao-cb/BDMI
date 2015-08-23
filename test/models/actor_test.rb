# == Schema Information
#
# Table name: actors
#
#  id             :integer          not null, primary key
#  name           :string           not null
#  place_of_birth :string
#  birthday       :date
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  biography      :text
#

require 'test_helper'

class ActorTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
