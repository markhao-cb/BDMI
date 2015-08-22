class Api::GenresController < ApplicationController
  def index
    @genre = Genre.find_by(name: params[:genre]) || Genre.first
    page = params[:page] || 1
    @movies = Genre.search_genre_detail_by_id(@genre.id)
    @movies = @movies.get_page(page) unless page == 1
    render 'genre_index'
  end

  def show
  end
end
