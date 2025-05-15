class User < ApplicationRecord
  has_one :vote
  validates :email, presence: true, uniqueness: true
  validates :zipcode, presence: true, length: { is: 5 } # assuming US zipcode, short form only
end
