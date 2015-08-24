json.extract!(actor, :name, :birthday)

if display_images
  json.images do
    json.array! actor.images do |image|
      json.partial! 'api/movies/image', image: image
    end
  end
end

if display_casting
  json.castings do
    json.array! actor.castings.where(movie_id: movie_id) do |casting|
      json.extract!(casting, :act_as, :ord)
    end
  end
end
