# == Schema Information
#
# Table name: reviews
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  movie_id   :integer          not null
#  grade      :integer          not null
#  title      :string
#  body       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Review < ActiveRecord::Base
  validates :author, :movie, :grade, :title, :body, presence:true

  belongs_to :movie
  belongs_to :author, foreign_key: :author_id, class_name: :User
  has_many :likes, as: :likeable
end
