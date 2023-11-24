class CitiesController < ApplicationController
  def index
    @cities = Country.find(params[:contact_country_id]).cities.order(:name)
    @target_id = params[:target_id]

    respond_to do |format|
      format.turbo_stream
    end
  end
end
