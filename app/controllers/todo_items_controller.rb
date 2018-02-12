class TodoItemsController < ApplicationController
  def index
    render json: TodoItem.all
  end

  def create
    TodoItem.create!(todo_item_params)
    index
    # TODO: return something here
  end

  def update
    todo.update_attributes(todo_item_params)
    # TODO: return something here
  end

  def destroy
    todo.destroy
    # TODO: return something here
  end

  private

  def todo
    TodoItem.find(params[:id])
  end

  def todo_item_params
    params.require(:todo_item).permit(:text, :is_done)
  end
end
