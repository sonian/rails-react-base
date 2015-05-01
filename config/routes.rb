Rails.application.routes.draw do
  scope 'todo_items' do
    get '/' => 'todo_items#index'
  end

  root :to => 'welcome#index'
end
