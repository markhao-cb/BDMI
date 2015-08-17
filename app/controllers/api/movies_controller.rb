class Api::MoviesController < ApplicationController
  def index
    page = params[:page]|| 1
    @movies = Movie.limit(10).offset((page.to_i  - 1) * 10)
    render json: @movies
  end

  def show
    @movie = Movie.find(params[:id])
    render 'show'
  end

  def intro_movies_index
    @movies = Movie.where('yr = ? and score >= ?', 2015, 7).limit(10)
    render 'movie_index'
  end

  def in_theaters_movies_index
    page = params[:page] || 1
    @movies = Movie.where('yr = ?', 2015).limit(10).offset((page.to_i  - 1) * 10)
    render 'movie_index'
  end
end
