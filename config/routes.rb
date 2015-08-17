Rails.application.routes.draw do
  root :to => "roots#root"

  resources :users
  resource :session

  namespace :api, defaults: {format: :json} do
    resources :movies, only: [:index, :show]
    resources :reviews, only: [:index, :create, :update, :destroy]
    get '/intro_movies_index', to: 'movies#intro_movies_index'
    get '/in_theaters_movies', to: 'movies#in_theaters_movies_index'
  end
end
