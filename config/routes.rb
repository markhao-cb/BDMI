Rails.application.routes.draw do
  root :to => "roots#root"

  resources :users
  resource :session
end
