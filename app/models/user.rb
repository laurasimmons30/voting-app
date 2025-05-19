class User < ApplicationRecord
  has_one :vote
  validates :email, presence: true, uniqueness: true
  validates :zipcode, presence: true, length: { is: 5 } # assuming US zipcode, short form only

  def as_json(options = {})
    super(options).merge({
      'hasVoted' => self.vote.present?
    })
  end
end
