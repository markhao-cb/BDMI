class Api::WantWatchMoviesController < ApplicationController
  def create
    wantwatch = Watchedmovie.new(wantwatch_params)
    if wantwatch.save
      render json: wantwatch
    else
      render json: { error: wantwatch.errors.full_messages }, status: 422
    end
  end

  def show
  end

  def destroy
    wantwatch = Watchedmovie.find(params[:id])
    wantwatch.destroy
    render json: wantwatch
  end

  private

  def wantwatch_params
    params.require(:wantwatchmovies).permit(:user_id, :movie_id)
  end
end
