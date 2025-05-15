class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :zipcode, null: false, limit: 5 #assume US zipcode, short form

      t.timestamps
    end
  end
end
