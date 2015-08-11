# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


File.foreach('/Users/Mark/Desktop/movie.txt').with_index do |line, line_num|
   arr = line.split(' ')
   p "#{arr}"
  #  Movie.create(id: arr[0].to_i, title: arr[1].to_s, yr: arr[2].to_i, score: arr[3].to_f, votes: arr[4].to_i, director_id: arr[5].to_i)
end
