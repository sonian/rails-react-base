class TodoItemsController < ApplicationController
  def index
    render json: TodoItem.all
  end
end

