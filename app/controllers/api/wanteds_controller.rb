class Api::WantedsController < ApplicationController
  def create
    wanted = Wantwatchmovie.find_by(user_id: current_user.id, movie_id: params[:movie_id])
    unless wanted
      wanted = current_user.want_watchs.new(movie_id: params[:movie_id])
      if wanted.save
        render json: wanted
      else
        render json: { error: wanted.errors.full_messages }, status: 422
      end
    else
      render json: wanted
    end
  end

  def destroy
    wantwatch = Watchedmovie.find(params[:id])
    wantwatch.destroy
    render json: wantwatch
  end
end
