# == Schema Information
#
# Table name: genres
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Genre < ActiveRecord::Base
  validates :name, presence: true
  has_many :taggings
  has_many :movies, through: :taggings
end
