class CreateWatchedmovies < ActiveRecord::Migration
  def change
    create_table :watchedmovies do |t|
      t.integer :user_id, null: false
      t.integer :movie_id, null: false

      t.timestamps null: false
    end
    add_index :watchedmovies, :user_id
    add_index :watchedmovies, :movie_id
  end
end
