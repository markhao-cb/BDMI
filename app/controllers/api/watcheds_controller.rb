class Api::WatchedsController < ApplicationController
  def create
    watched = Watchedmovie.find_by(user_id: current_user.id, movie_id: params[:movie_id])
    unless watched
      watched = current_user.has_watcheds.new(movie_id: params[:movie_id])
      if watched.save
        render json: watched
      else
        render json: { error: watched.errors.full_messages }, status: 422
      end
    else
      render json: watched
    end
  end

  def destroy
    watched = Watchedmovie.find(params[:id])
    watched.destroy
    render json: watched
  end
end
