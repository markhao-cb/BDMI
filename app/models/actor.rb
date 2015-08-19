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

class Actor < ActiveRecord::Base
  validates :name, presence: true

  has_many :castings
  has_many :movies, through: :castings
  has_many :images, as: :imageable
  has_many :likes, as: :likeable
end
