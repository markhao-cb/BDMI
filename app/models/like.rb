# == Schema Information
#
# Table name: likes
#
#  id            :integer          not null, primary key
#  author_id     :integer          not null
#  likeable_id   :integer
#  likeable_type :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Like < ActiveRecord::Base
  validates :author, presence: true
  belongs_to :author, foreign_key: :author_id, class_name: :User
  belongs_to :likeable, polymorphic: true
end
