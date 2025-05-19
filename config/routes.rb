Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "home#index"

  resources :votes, only: [ :show ]
  post "votes/:id", to: "votes#vote"
  resources :candidates, only: [:create]

  get "/results", to: "votes#results"
  get "/login", to: "sessions#login"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
end
