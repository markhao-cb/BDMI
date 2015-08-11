class Addcolumntousers < ActiveRecord::Migration
  def change
    add_column :users, :email, :string, null: false
    add_column :users, :password_digest, :string, null: false
    add_column :users, :session_token, :string, null: false
    add_index :usrs, :email, :session_token, unique: true
  end
end
