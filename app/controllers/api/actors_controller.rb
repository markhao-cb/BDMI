class Api::ActorsController < ApplicationController
  def index
    name = params[:name] || "Tom"
    @actors = Actor.search_actors_by_name(name)
    @config = Movie.find_config
    render 'actors'
  end

  def show
    person_id = params[:id]
    @credits = Actor.search_credits(person_id)['cast']
    @actor = Actor.find_by(id: person_id)
    if @actor.nil? || @actor.biography.nil?
      Actor.search_and_store_by_id(person_id)
      @actor = Actor.find_by(id: person_id)
    end
    @config = Movie.find_config
    render 'show'
  end
end
