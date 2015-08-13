class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :author_id, null: false
      t.references :likeable, polymorphic: true, index: true

      t.timestamps null: false
    end
    add_index :likes, :author_id
  end
end
