class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.integer :yr, null: false, default: 1000
      t.date :release_date

      t.timestamps null: false
    end
  end
end
