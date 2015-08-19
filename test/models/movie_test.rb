# == Schema Information
#
# Table name: movies
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  release_date :date
#  runtime      :integer
#  vote_average :float
#  vote_count   :integer
#  popularity   :float
#  overview     :text
#  imdb_id      :string
#  revenue      :integer
#  tagline      :string
#  budget       :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class MovieTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
