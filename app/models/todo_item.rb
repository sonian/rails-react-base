class TodoItem < ActiveRecord::Base
  def to_json(options = {})
    { text: text, is_done: is_done, id: id }
  end
end

