class Api::MoviesController < ApplicationController
  def index
    movie = Movie.getData
    a = Movie.getacData
    fail
    # @movies = Movie.all
    # @movies.each do |movie|
    #   if movie.images.empty? || movie.posters.empty? || movie.actors.empty? || movie.genres.empty?
    #     movie.destroy
    #   end
    # end
  end

  def show
    @movie = Movie.find_by(id: params[:id])
    unless @movie
      @movie = Movie.search_and_store_by_id(params[:id])
    end
    @watched =  @movie.watchers.include?(current_user)
    @wanted = @movie.want_watchers.include?(current_user)
    render 'show'
  end

  def intro_movies_index
    @movies = Movie.order('popularity DESC').limit(4)
    render 'movie_index'
  end

  def in_theaters_movies_index
    page = params[:page] || 1
    @movies = Movie.where('release_date > ? and release_date < ?',
                          3.months.ago, Date.today).order("vote_count DESC")
                          .limit(8).offset((page.to_i  - 1) * 8)
    render 'movie_index'
  end

  def top_rated
    page = params[:page] || 1
    @movies = Movie.where('vote_average > ? and vote_count > ?',
                          7.5, 10).order("created_at DESC")
                          .limit(8).offset((page.to_i  - 1) * 8)
    render 'movie_index'
  end

  def search
    title = params["title"] || "Spider man"
    @movies = Movie.search_by_title(title)
    @config = Movie.find_config
    render 'search'
  end

  def search_trailer
    @movie = Movie.find(params[:movie_id])
    unless @movie.trailer
      trailer = Movie.search_trailer_by_id(@movie.id)
      render json: trailer
    else
      render json: @movie.trailer
    end
  end
end
