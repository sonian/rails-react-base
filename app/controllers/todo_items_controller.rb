class TodoItemsController < ApplicationController
  def index
    render json: TodoItem.all
  end

  def create
    todo_item = TodoItem.create!(todo_item_params)

    index
  end

  def update
    todo_item = TodoItem.find(params['todo_item']['id'])
    todo_item.update(todo_item_params)

    index
  end

  def destroy
    todo_item = TodoItem.find(params['todo_item']['id'])
    todo_item.destroy

    index
  end

  private

  def todo_item_params
    params.require(:todo_item).permit(:text, :is_done)
  end
end
