class CandidatesController < ApplicationController
  def create
    # method to check if voter has already voted?
    @candidate = Candidate.new(candidate_params)

    if @candidate.save && Candidate.count <= Candidate::MAX_LIMIT
      vote = Vote.new(candidate: @candidate, user_id: session[:user_id])

      if vote.save
        render json: {data: Candidate.all , status: :created }
      end
    end
  end

  private

  def candidate_params
    params.require(:candidate).permit(:name)
  end
end
