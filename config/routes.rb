Rails.application.routes.draw do
  resources :todo_items, only: [:index, :create, :update, :destroy]

  root to: 'welcome#index'
end
