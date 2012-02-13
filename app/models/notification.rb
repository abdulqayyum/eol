class Notification < ActiveRecord::Base
  belongs_to :user
  has_many :pending_notifications
  belongs_to :reply_to_comment, :foreign_key => :reply_to_comment,
    :class_name => 'NotificationFrequency'
  belongs_to :comment_on_my_profile, :foreign_key => :comment_on_my_profile,
    :class_name => 'NotificationFrequency'
  belongs_to :comment_on_my_contribution, :foreign_key => :comment_on_my_contribution,
    :class_name => 'NotificationFrequency'
  belongs_to :comment_on_my_collection, :foreign_key => :comment_on_my_collection,
    :class_name => 'NotificationFrequency'
  belongs_to :comment_on_my_community, :foreign_key => :comment_on_my_community,
    :class_name => 'NotificationFrequency'
  belongs_to :made_me_a_manager, :foreign_key => :made_me_a_manager,
    :class_name => 'NotificationFrequency'
  belongs_to :member_joined_my_community, :foreign_key => :member_joined_my_community,
    :class_name => 'NotificationFrequency'
  belongs_to :comment_on_my_watched_item, :foreign_key => :comment_on_my_watched_item,
    :class_name => 'NotificationFrequency'
  belongs_to :curation_on_my_watched_item, :foreign_key => :curation_on_my_watched_item,
    :class_name => 'NotificationFrequency'
  belongs_to :new_data_on_my_watched_item, :foreign_key => :new_data_on_my_watched_item,
    :class_name => 'NotificationFrequency'
  belongs_to :changes_to_my_watched_collection, :foreign_key => :changes_to_my_watched_collection,
    :class_name => 'NotificationFrequency'
  belongs_to :changes_to_my_watched_community, :foreign_key => :changes_to_my_watched_community,
    :class_name => 'NotificationFrequency'
  belongs_to :member_joined_my_watched_community, :foreign_key => :member_joined_my_watched_community,
    :class_name => 'NotificationFrequency'
  belongs_to :member_left_my_community, :foreign_key => :member_left_my_community,
    :class_name => 'NotificationFrequency'
  belongs_to :new_manager_in_my_community, :foreign_key => :new_manager_in_my_community,
    :class_name => 'NotificationFrequency'
  belongs_to :i_am_being_watched, :foreign_key => :i_am_being_watched,
    :class_name => 'NotificationFrequency'
  # NOTE - there's a relationship here to the PendingNotification class, which actually references the literal name of
  # the field.  THUS (!) if you create a new field on this table, note that you are limited to 64 characters or less.
  # I think that's a reasonable limit.  ;)
end