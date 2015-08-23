class Api::ActorsController < ApplicationController
  def index
    name = params[:name] || "Tom"
    @actors = Actor.search_actors_by_name(name)
    @config = Movie.find_config
    render 'actors'
  end

  def show
    @actor = Actor.find_by(id: params[:id])
    if @actor.nil? || @actor.biography.nil?
      @actor = Actor.search_and_store_by_id(params[:id])
    end
    render 'show'
  end
end
