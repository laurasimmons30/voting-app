class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:create]
  before_action :current_user
  def login
  end

  def create
    @user = User.find_or_initialize_by(user_params)

    if @user.save
      session[:user_id] = @user.id
      respond_to do |format|
        format.html {}
        format.js {}
        format.json { respond_with :ok }
      end

      redirect_to vote_path(@user)
    else
      message = "Please try again! Make sure your email and zipcode are valid"
      flash[:notice] = message
      render :login
    end
  end

  def destroy
    session.delete(:user_id)
    @current_user = nil
    redirect_to login_path
  end

  private
  def user_params
    params.permit(:email, :zipcode)
  end
end
