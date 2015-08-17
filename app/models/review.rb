class Review < ActiveRecord::Base
  validates :author, :movie, :grade, :title, :body, presence:true

  belongs_to :movie
  belongs_to :author, foreign_key: :author_id, class_name: :User
  has_many :likes, as: :likeable
end
