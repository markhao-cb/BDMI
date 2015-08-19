class CreateWantwatchmovies < ActiveRecord::Migration
  def change
    create_table :wantwatchmovies do |t|
      t.integer :user_id, null: false
      t.integer :movie_id, null: false

      t.timestamps null: false
    end
    add_index :wantwatchmovies, :user_id
    add_index :wantwatchmovies, :movie_id
  end
end
