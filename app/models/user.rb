class User < ApplicationRecord
  has_one :vote
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :zipcode, presence: true, format: { with: /\A\d{5}\z/ } # assuming US zipcode, short form only

  def as_json(options = {})
    super(options).merge({
      'hasVoted' => self.vote.present?
    })
  end
end
