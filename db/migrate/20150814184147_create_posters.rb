class CreatePosters < ActiveRecord::Migration
  def change
    create_table :posters do |t|
      t.string :poster_url, null: false
      t.integer :movie_id, null: false

      t.timestamps null: false
    end
    add_index :posters, :movie_id
  end
end
