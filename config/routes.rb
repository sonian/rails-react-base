Rails.application.routes.draw do
  scope 'todo_items' do
    get '/' => 'todo_items#index'
    post '/' => 'todo_items#create'
    put '/' => 'todo_items#update'
    delete '/' => 'todo_items#destroy'
  end

  root to: 'welcome#index'
end
