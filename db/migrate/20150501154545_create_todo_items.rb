class CreateTodoItems < ActiveRecord::Migration
  def change
    create_table :todo_items do |t|
      t.string :text
      t.boolean :is_done

      t.timestamps null: false
    end
  end
end
