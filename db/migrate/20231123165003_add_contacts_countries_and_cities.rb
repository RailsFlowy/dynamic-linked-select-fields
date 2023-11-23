class AddContactsCountriesAndCities < ActiveRecord::Migration[7.1]
  def change
    create_table :countries do |t|
      t.string :name

      t.timestamps
    end

    create_table :cities do |t|
      t.string :name
      t.references :country, null: false, foreign_key: true

      t.timestamps
    end

    create_table :contacts do |t|
      t.string :name
      t.string :email
      t.references :city, null: false, foreign_key: true

      t.timestamps
    end
  end
end
