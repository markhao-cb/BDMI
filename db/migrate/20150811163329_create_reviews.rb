class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :author_id, null: false
      t.integer :movie_id, null: false
      t.integer :grade, null: false
      t.string :title
      t.string :body

      t.timestamps null: false
    end
    add_index :reviews, :author_id
    add_index :reviews, :movie_id
  end
end
