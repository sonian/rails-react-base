class TodoItem < ActiveRecord::Base
  def to_json(_options = {})
    { text: text, is_done: is_done, id: id }
  end
end
