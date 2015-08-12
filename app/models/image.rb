class Image < ActiveRecord::Base
  validates :title, presence: true

  belongs_to :imageable, :polymorphic => true
end
