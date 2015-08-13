class Image < ActiveRecord::Base
  validates :image_url, presence: true

  belongs_to :imageable, polymorphic: true
end
