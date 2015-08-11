class AddColumnsToMovies < ActiveRecord::Migration
  def change
    add_column :movies, :score, :float, null: false
    add_column :movies, :votes, :integer, null: false
    add_column :movies, :director_id, :integer, null: false
  end
end
