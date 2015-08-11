Rails.application.routes.draw do
  root :to => "roots#root"

  resources :users
  resource :session

  namespace :api, defaults: {format: :json} do
    resources :movies, only: [:index, :show] do
      resources :reviews, only: :index
    end
    resources :reviews, only: [:create, :update, :destroy]
  end
end
