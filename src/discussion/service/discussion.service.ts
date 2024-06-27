import fs from 'fs';
import { MediaRepository } from "../../media/repository/media.repository";
import { TagRepository } from "../../tag/repository/tag.repository";
import { DiscussionRepository } from "../repository/discussion.repository";
import { User } from '../../user/models/User';
import mongoose from 'mongoose';
import { Tag } from '../../tag/models/Tag';
import { Media } from '../../media/models/Media';

export class DiscussionService {
  private discussionRepository: DiscussionRepository;
  private mediaRepository: MediaRepository;
  private tagRepository: TagRepository;

  constructor () {
    this.discussionRepository = new DiscussionRepository();
    this.mediaRepository = new MediaRepository();
    this.tagRepository = new TagRepository();
  }

  create = async (body: any, user: User, file?: Express.Multer.File) => { 
    try {
      let media: Media | undefined;
      if (file) {
        const imageBase64 = fs.readFileSync(file.path, { encoding: 'base64' });  
        media = await this.mediaRepository.create({
          createdBy: user._id as mongoose.Types.ObjectId,
          mediaType: 'discussion',
          mimeType: file.mimetype,
          base64data: imageBase64,
          size: file.size
        });
      }
  
      const text: string = body.text;
      const tags: string[] = body.tags ?? [];
      const attachTagsInPost: Tag[] = [];
      for (const tagName of tags) {
        let isTagPresent = await this.tagRepository.findOneByName(tagName);
        let tag: Tag;
        if (!isTagPresent) {
          tag = await this.tagRepository.create({
            name: tagName,
            startedBy: user._id as mongoose.Types.ObjectId
          });
        } else {
          const updatedTag = await this.tagRepository.incrementTagUsage(isTagPresent._id);
          tag = updatedTag!;
        }
        attachTagsInPost.push(tag);
      }
  
      const post = await this.discussionRepository.create({
        createdBy: user._id as mongoose.Types.ObjectId,
        tags: attachTagsInPost.map((tag) => tag._id as mongoose.Types.ObjectId),
        text: text,
        media: media ? media._id as mongoose.Types.ObjectId : undefined
      });
  
      const response = {
        post: post,
        attachment: media?.base64data ?? undefined,
        tags: attachTagsInPost
      };
      return response;
    } catch (err: any) {
      console.error(err);
      return Promise.reject({ message: err.message });
    }
  }
}