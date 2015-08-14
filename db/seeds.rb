# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#
# File.foreach('/Users/Mark/Desktop/movie.txt').with_index do |line, line_num|
#    arr = line.split(' ')
#    p "#{arr}"
#   #  Movie.create(id: arr[0].to_i, title: arr[1].to_s, yr: arr[2].to_i, score: arr[3].to_f, votes: arr[4].to_i, director_id: arr[5].to_i)
# end


movie = Movie.create!(title:"Mission Impossible Rogue Nation", yr: 2015, score:7.8, votes: 1534, director_id: 1)
image = movie.images.create!(image_url:"http://redcarpetrefs.com/wp-content/uploads/2015/07/zz6.jpg")
review = movie.reviews.create!(title:"It's just Amazing!", body: "Tom Cruise!!!", author_id:1, grade:10)
post = movie.posts.create!(post_url:"http://www.movieposterdb.com/posters/15_08/2015/2381249/t_2381249_6fc41d98.jpg")

movie1 = Movie.create!(title:"Ted 2", yr: 2014, score:6, votes: 333, director_id: 1)
image1 = movie1.images.create!(image_url:"http://geeknewsnetwork.net/wp-content/uploads/2015/06/2015_ted_2_movie-3840x2160.jpg")
review1 = movie1.reviews.create!(title:"This review is for Ted 2", body: "Laasdfnaoekqo qoenqvkeq oqerjn kjnqwerkj oqwernqvjqe jqwejqwvqe qweaafdqienqer qewasdkj.", author_id:1, grade:8)
post1 = movie1.posts.create!(post_url:"http://www.movieposterdb.com/posters/15_04/2015/2637276/t_2637276_46424313.jpg")
