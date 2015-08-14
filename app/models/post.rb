class Post < ActiveRecord::Base
  validates :post_url, :movie, presence: true
  belongs_to :movie
end
