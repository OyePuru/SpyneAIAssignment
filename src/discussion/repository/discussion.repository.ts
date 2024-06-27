import { IDiscussion } from "../interface/discussion.interface";
import { Discussion } from "../models/Discussion"

export class DiscussionRepository {
  create = async (discussion: IDiscussion) => {
    return await new Discussion(discussion).save();
  }
}