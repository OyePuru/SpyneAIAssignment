import { Follow } from "../models/Follow"

export class FollowRepository {
  follow = async (user_id: any, follower_id: any) => {
    return await new Follow({
      user_id,
      follower_id, 
    }).save()
  }

  unfollow = async (user_id: any, follower_id: any) => {
    return await Follow.findOneAndDelete({
      user_id,
      follower_id, 
    }).exec();
  } 
}