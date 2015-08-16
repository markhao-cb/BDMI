json.extract!(actor, :name)

if display_images
  json.images do
    json.array! actor.images do |image|
      json.partial! 'api/movies/image', image: image
    end
  end
end
