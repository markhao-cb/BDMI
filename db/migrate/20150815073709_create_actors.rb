class CreateActors < ActiveRecord::Migration
  def change
    create_table :actors do |t|
      t.string :name, null:false
      t.string :place_of_birth
      t.date   :birthday

      t.timestamps null: false
    end
  end
end
