# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
countries = ['Portugal', 'Spain', 'France']
cities = {
  'Portugal' => ['Lisbon', 'Porto', 'Coimbra', 'Faro'],
  'Spain' => ['Madrid', 'Barcelona', 'Seville', 'Valencia'],
  'France' => ['Paris', 'Lyon', 'Marseille', 'Nice']
}

countries.each do |country_name|
  country = Country.create!(name: country_name)
  cities[country_name].each do |city_name|
    City.create!(name: city_name, country: country)
  end
end
