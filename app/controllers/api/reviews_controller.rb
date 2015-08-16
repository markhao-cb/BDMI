class Api::ReviewsController < ApplicationController
  def index
    @reviews = current_user.reviews.includes(:movie)
    render json: @reviews
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
