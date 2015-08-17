class Api::ReviewsController < ApplicationController
  def index
    page = params[:page] || 1
    movie_id = params[:movie_id]
    user_id = params[:user_id]
    if movie_id && user_id
      @reviews = Review.where('movie_id = ? and author_id = ?', movie_id, user_id)
                       .limit(4)
                       .offset(( page.to_i - 1) * 10 )
                       .includes(:author)
    elsif movie_id
      @reviews = Review.where('movie_id = ?', movie_id)
                       .limit(4)
                       .offset(( page.to_i - 1) * 10 )
                       .includes(:author)
    elsif user_id
      @reviews = Review.where('author_id = ?', user_id)
                       .limit(4)
                       .offset(( page.to_i - 1) * 10 )
                       .includes(:author)
    end
    render "api/reviews/index"
  end

  def create
    @review = current_user.reviews.new(review_params)
    if @review.save
      render json: @review
    else
      render json: { error: @review.errors.full_messages }, status: 422
    end
  end

  def update
    @review = Review.find(params[:id])
    if @review.update(review_params)
      render json: @review
    else
      render json: { error: @review.errors.full_messages }, status: 422
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
    render json: {}
  end

  def show
    @review = Review.find(params[:id])
    render json: @review
  end

  private

  # def current_movie
  #   @movie = Movie.find(params[:movie_id])
  # end

  def review_params
    params.require(:review).permit(:title, :body, :grade, :movie_id)
  end
end
