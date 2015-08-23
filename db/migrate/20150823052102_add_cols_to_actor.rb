class AddColsToActor < ActiveRecord::Migration
  def change
    add_column :actors, :biography, :text
  end
end
