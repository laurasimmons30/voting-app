require 'rails_helper'

RSpec.describe Candidate, type: :model do
  describe "validations" do
    context "should validate" do
      it 'when name present' do
        candidate = Candidate.create(name: "Sabrina Carpenter")

        expect(candidate).to be_valid
      end
    end

    context "should not validate" do
      it "when name not present" do
        expect(Candidate.create).to_not be_valid
      end

      it "when name already exists" do
        Candidate.create(name: "Sabrina Carpenter")
        candidate2 = Candidate.create(name: "Sabrina Carpenter")

        expect(candidate2).to_not be_valid
        expect(Candidate.count).to eq 1
      end
    end
  end

  describe "votes" do
    let(:user) { User.create(email: "test@test.com", zipcode: "12345") }
    let(:user2) { User.create(email: "test2@test.com", zipcode: "67890")  }
    let(:candidate) { Candidate.create(name: "Sabrina Carpenter") }

    it "added to candidates tally" do
      Vote.create(user: user, candidate: candidate)
      Vote.create(user: user2, candidate: candidate )

      expect(candidate.votes.count).to eq 2
    end
  end
end
