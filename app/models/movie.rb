# == Schema Information
#
# Table name: movies
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  release_date :date
#  runtime      :integer
#  vote_average :float
#  vote_count   :integer
#  popularity   :float
#  overview     :text
#  imdb_id      :string
#  revenue      :integer
#  tagline      :string
#  budget       :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Movie < ActiveRecord::Base
  validates :title, presence: true

  has_many :reviews
  has_many :images, as: :imageable
  has_many :likes, as: :likeable
  has_many :posters
  has_many :castings
  has_many :actors, through: :castings
  has_many :taggings
  has_many :genres, through: :taggings
  belongs_to :director, foreign_key: :director_id, class_name: :Actor

  Tmdb::Api.key(ENV['THEMOVIEDB_API_KEY'])
  @configuration = Tmdb::Configuration.new


  def update_score_and_num_of_votes(score)
    all_scores = self.vote_average * (self.vote_count + self.reviews.count) + score
    score = all_scores / (self.vote_count + self.reviews.count)
  end

  def self.getData
    Tmdb::Movie.popular
  end

  def self.upload
    auth = {
      cloud_name: ENV['CLOUD_NAME'],
      api_key: ENV['CLOUD_API_KEY'],
      api_secret: ENV['CLOUD_API_SECRET'],
      upload_preset: ENV['UPLOAD_PRESET']
    };
    a = Cloudinary::Uploader.upload("http://cf2.imgobject.com/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg", auth)
  end

  def self.get_in_theathers_data
    Tmdb::Movie.now_playing
  end


  def self.find_or_create_by_url(url)
    feed = Feed.find_by_url(url)
    return feed if feed

    begin
      feed_data = SimpleRSS.parse(open(url))
      feed = Feed.create!(title: feed_data.title, url: url)
      feed_data.entries.each do |entry_data|
        Entry.create_from_json!(entry_data, feed)
      end
    rescue SimpleRSSError
      return nil
    end

    feed
  end
end
