# == Schema Information
#
# Table name: images
#
#  id             :integer          not null, primary key
#  image_url      :string           not null
#  thumbnil_url   :string
#  imageable_id   :integer
#  imageable_type :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Image < ActiveRecord::Base
  validates :image_url, presence: true

  belongs_to :imageable, polymorphic: true
end
