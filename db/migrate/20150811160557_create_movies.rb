class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.date :release_date
      t.integer :runtime
      t.float :vote_average
      t.integer :vote_count
      t.float :popularity
      t.text :overview
      t.string :imdb_id
      t.integer :revenue
      t.string :tagline
      t.integer :budget

      t.timestamps null: false
    end
  end
end
