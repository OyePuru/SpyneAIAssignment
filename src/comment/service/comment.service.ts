import { Discussion } from "../../discussion/models/Discussion";
import { DiscussionRepository } from "../../discussion/repository/discussion.repository";
import { User } from "../../user/models/User";
import { Comment } from "../models/Comment";

export class CommentService {
  private discussionRepository: DiscussionRepository
  constructor () {
    this.discussionRepository = new DiscussionRepository();
  }

  create = async (content: string, discussion: Discussion, user: User ) => {
    const comment = await new Comment({
      content: content,
      discussion: discussion._id,
      user: user._id
    }).save();
    await this.discussionRepository.addComments(discussion._id, comment)
  }
}