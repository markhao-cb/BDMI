class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :post_url, null: false
      t.integer :movie_id, null: false

      t.timestamps null: false
    end
    add_index :posts, :movie_id
  end
end
