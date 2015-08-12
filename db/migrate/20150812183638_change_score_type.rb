class ChangeScoreType < ActiveRecord::Migration
  def change
    change_column :movies, :score, :float
  end
end
