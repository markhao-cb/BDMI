json.array! @actors do |actor|
  unless actor.profile_path.nil?
    json.extract!(
      actor,
      :id,
      :name,
      :profile_path
    )
    json.extract!(@config, :base_url)
  end
end
