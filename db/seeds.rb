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
review = movie.reviews.create(title:"It;s just Amazing!", body: "Tom Cruise!!!", author_id:1, grade:10)
