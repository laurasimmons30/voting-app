class VotesController < ApplicationController
  before_action :verify_current_user, :current_user
  skip_before_action :verify_current_user, :require_login, only: [:results]

  def vote
    candidate = Candidate.find(params[:vote_id])
    user = User.find(session[:user_id])

    vote = Vote.new(user_id: user.id, candidate_id: candidate.id)

    if vote.save!
      render json: :ok
    else
      render json: :error
    end
  end

  def show
    @user = current_user
    @candidates = Candidate.all
  end

  def results
    if @current_user&.vote
      session.delete(:user_id)
    end

    @results = Vote.group(:candidate).count.transform_keys(&:name).sort_by { |k,v| v }.reverse
  end

  private

  def verify_current_user
    unless current_user.id.to_s == params[:id]
      flash[:error] = "You must be logged in to access this section"
      redirect_to login_path
    end
  end
end
