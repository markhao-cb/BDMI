class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :image_url, null: false
      t.string :thumbnil_url
      t.references :imageable, polymorphic: true, index: true
      t.timestamps null: false
    end
  end
end
