class Api::MoviesController < ApplicationController
  def index
    @movies = Movie.all
    render json: @movies
  end

  def show
    @movie = Movie.find(params[:id])
    render json: @movie
  end

  def intro_movies_index
    @movies = Movie.where('yr = ? or score > ?', 2015, 7)
    render 'movie_index'
  end

  def in_theaters_movies_index
    @movies = Movie.where('created_at > ?', 30.days.ago)
    render 'movie_index'
  end
end
