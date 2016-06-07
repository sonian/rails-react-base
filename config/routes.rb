Rails.application.routes.draw do
  scope 'todo_items' do
    get '/' => 'todo_items#index'
    post '/' => 'todo_items#create'
  end

  root to: 'welcome#index'
end
