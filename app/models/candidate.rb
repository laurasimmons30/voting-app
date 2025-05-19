class Candidate < ApplicationRecord
  MAX_LIMIT = 10

  has_many :votes, dependent: :destroy
  validates :name, presence: true, uniqueness: true
end
