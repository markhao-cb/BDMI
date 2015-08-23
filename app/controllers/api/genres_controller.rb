class Api::GenresController < ApplicationController
  def index
    @genre = Genre.find_genre(params[:genre])
    @config = Movie.find_config
    page = params[:page].to_i
    @movies = Genre.search_genre_detail_by_id(@genre.id)
    @movies = @movies.get_page(page) unless (0..1).include? page
    render 'genre_index'
  end

  def show
  end
end
