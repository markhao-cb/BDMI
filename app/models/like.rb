class Like < ActiveRecord::Base
  validates :author, presence: true
  belongs_to :author, foreign_key: :author_id, class_name: :User
  belongs_to :likeable, polymorphic: true
end