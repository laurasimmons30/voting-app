class AddUniqueIndexToUserAndVotes < ActiveRecord::Migration[7.0]
  def change
    add_index :votes, [:user_id, :candidate_id], unique: true
  end
end
