require 'rails_helper'

RSpec.describe Vote, type: :model do
  let(:user) { User.create(email: "test@test.com", zipcode: "12345") }
  let(:candidate) { Candidate.create(name: "Sabrina Carpenter")}
  let(:candidate2) { Candidate.create(name: "Chappell Roan")}

  describe "validations" do
    context "should validate" do
      it 'when user_id and candidate_id present' do
        vote = Vote.create(user: user, candidate: candidate)

        expect(vote).to be_valid
      end
    end

    context "should not validate" do
      it "when user_id and candidate_id not present" do
        expect(Vote.create).to_not be_valid
      end

      it "when user_id not present" do
        expect(Vote.create(candidate: candidate)).to_not be_valid
      end

      it "when candidate_id not present" do
        expect(Vote.create(user: user)).to_not be_valid
      end

      it "when a user has already voted" do
        Vote.create(user: user, candidate: candidate)

        # try to vote again and vote for another candidate
        Vote.create(user: user, candidate: candidate)
        Vote.create(user: user, candidate: candidate2)

        expect(Vote.count).to eq 1
      end
    end
  end
end
