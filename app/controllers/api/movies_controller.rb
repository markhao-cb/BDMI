class Api::MoviesController < ApplicationController
  def index
    @movies = Movie.limit(20)
    render json: @movies
  end

  def show
    @movie = Movie.find(params[:id])
    render 'show'
  end

  def intro_movies_index
    @movies = Movie.where('yr = ? and score >= ?', 2015, 7)
    render 'movie_index'
  end

  def in_theaters_movies_index
    @movies = Movie.where('yr > ?', 2000)
    render 'movie_index'
  end
end
