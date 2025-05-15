require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    context "should validate" do
      it 'when email present and 5 digit zipcode present' do
        user = User.create(email: "test@test.com", zipcode: "12345")

        expect(user).to be_valid
      end
    end

    context "should not validate" do
      it "when email and zipcode not present" do
        expect(User.create).to_not be_valid
      end

      it "when email not present" do
        expect(User.create(email: "test@test.com")).to_not be_valid
      end

      it "when email already exists" do
        User.create(email: "test@test.com", zipcode: "12345")
        user2 = User.create(email: "test@test.com", zipcode: "12345")

        expect(user2).to_not be_valid
        expect(User.count).to eq 1
      end

      it "when zipcode not present" do
        expect(User.create(zipcode: "12345")).to_not be_valid
      end

      it "when zipcode is not 5 digits" do
        User.create(email: "test@test.com", zipcode: "123456")
        User.create(email: "test2@test.com", zipcode: "1")

        expect(User.count).to eq 0
      end
    end
  end

  describe "voting" do
    let(:user) { User.create(email: "test@test.com", zipcode: "12345") }
    let(:candidate) { Candidate.create(name: "Sabrina Carpenter") }

    it "a user can cast vote" do
      vote = Vote.create(user: user, candidate: candidate)

      expect(user.vote).to be vote
    end
  end
end
