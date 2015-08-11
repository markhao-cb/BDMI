class DropMovieTable < ActiveRecord::Migration
  def change
    drop_table :movies
    create_table :movies do |t|
      t.string :title, null: false
      t.integer :yr
      t.decimal :score
      t.integer :votes
      t.integer :director_id

      t.timestamps null: false
    end
    add_index :movies, :director_id
  end
end
