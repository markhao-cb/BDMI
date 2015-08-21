class CreateTrailers < ActiveRecord::Migration
  def change
    create_table :trailers do |t|
      t.string :source, null: false
      t.integer :movie_id, null: false

      t.timestamps null: false
    end
    add_index :trailers, :movie_id, unique: true
  end
end
