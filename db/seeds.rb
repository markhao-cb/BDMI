# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#
# File.foreach('/Users/Mark/Desktop/actors.txt').with_index do |line, line_num|
#    arr = line.split(',')
#    Actor.create(id: arr[0].to_i, name: arr[1].chomp.to_s)
# end
#
# File.foreach('/Users/Mark/Desktop/movie.txt').with_index do |line, line_num|
#    arr = line.split('|')
#    Movie.create(id: arr[0].to_i, title: arr[1].to_s, yr: arr[2].to_i, score: arr[3].to_f, votes: arr[4].to_i, director_id: arr[5].to_i)
# end
#
#
# File.foreach('/Users/Mark/Desktop/casting.txt').with_index do |line, line_num|
#    arr = line.split(',')
#    Casting.create(movie_id: arr[0].to_i, actor_id: arr[1].to_i, ord: arr[2].to_i)
# end


mark = User.create(email:"mark@gmail.com", username:"Markximu", password:"123456")
gizmo = User.create(email:"gizmo@gmail.com", username:"Gizmo", password:"123456")
guest = User.create(email:"guest@gmail.com", username:"guest", password:"123456")

movie = Movie.create(title:"Mission Impossible Rogue Nation", yr: 2015, score:7.8, votes: 1534, director_id: 10)
image = movie.images.create(image_url:"http://redcarpetrefs.com/wp-content/uploads/2015/07/zz6.jpg")
review = movie.reviews.create(title:"It's just Amazing!", body: "Tom Cruise!!!", author_id:1, grade:10)
review2 = movie.reviews.create(title:"I don't like it.", body: "It's terrible, I left befor it's over.", author_id:2, grade:2)
post = movie.posts.create(post_url:"http://res.cloudinary.com/dypfv4yqq/image/upload/v1439859209/11266619_10153122819937730_9045367438836263730_o_iy9lck.jpg")
#
movie1 = Movie.create(title:"Ted 2", yr: 2015, score:6, votes: 333, director_id: 1)
image1 = movie1.images.create(image_url:"http://geeknewsnetwork.net/wp-content/uploads/2015/06/2015_ted_2_movie-3840x2160.jpg")
review1 = movie1.reviews.create(title:"This review is for Ted 2", body: "Laasdfnaoekqo qoenqvkeq oqerjn kjnqwerkj oqwernqvjqe jqwejqwvqe qweaafdqienqer qewasdkj.", author_id:1, grade:8)
post1 = movie1.posts.create(post_url:"http://res.cloudinary.com/dypfv4yqq/image/upload/v1439859213/Ted_poster_ydjjh5.jpg")
