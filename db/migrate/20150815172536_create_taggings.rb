class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :movie_id, null: false
      t.integer :genre_id, null: false

      t.timestamps null: false
    end
    add_index :taggings, :movie_id
    add_index :taggings, :genre_id
  end
end
