import fs from 'fs';
import { MediaRepository } from "../../media/repository/media.repository";
import { TagRepository } from "../../tag/repository/tag.repository";
import { DiscussionRepository } from "../repository/discussion.repository";
import { User } from '../../user/models/User';
import mongoose from 'mongoose';
import { Tag } from '../../tag/models/Tag';
import { Media } from '../../media/models/Media';
import { Discussion } from '../models/Discussion';

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
  
      const discussion = await this.discussionRepository.create({
        createdBy: user._id as mongoose.Types.ObjectId,
        tags: attachTagsInPost.map((tag) => tag._id as mongoose.Types.ObjectId),
        text: text,
        media: media ? media._id as mongoose.Types.ObjectId : undefined
      });
  
      const response = {
        discussion: discussion,
        tags: attachTagsInPost,
        media
      };
      return response;
    } catch (err: any) {
      console.error(err);
      return Promise.reject({ message: err.message });
    }
  }

  update = async (body: any, user: User, discussionId: string) => {
    try {
      const update: any = {};
      if (body.text) {
        update.text = body.text;
      }
      let discussion: Discussion | null = await this.discussionRepository.findOneByUser(user._id, discussionId);
      if (!discussion) {
        return Promise.reject({ err_code: 400, message: "discussion not found!"})
      }

      let attachTagsInPost: Tag[] = [];
      if (body.tags) {
        const tags: string[] = body.tags ?? [];
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
          update.tags = attachTagsInPost.map((tag) => tag._id as mongoose.Types.ObjectId);
        }
      } else {
        attachTagsInPost = await this.tagRepository.findTagByTagIds(discussion?.tags! || [])
      }
      discussion = await this.discussionRepository.update(discussionId, update);
      const media = discussion?.media ? await this.mediaRepository.findById(discussion.media) : null;
      const response: any = {
        discussion: discussion,
        tags: attachTagsInPost,
        media
      }
      return response;
    } catch (err: any) {
      console.error(err);
      return Promise.reject({ message: err.message });
    }
  }

  delete = async (discussionId: any, userId: any) => {
    const discussion = await this.discussionRepository.findOneByUser(userId, discussionId);
    if (!discussion) {
      return Promise.reject({ err_code: 400, message: "discussion not found!"});
    }
    if (discussion.media) {
      await this.mediaRepository.deleteById(discussion.media)
    }
    await this.discussionRepository.deleteById(discussion.id);
  }

  getDiscussionsByTagId = async (tagId: string) => {
    return await this.discussionRepository.getDiscussionsByTagId(tagId);
  }

  getDiscussionsBySearching = async (body: any) => {
    const searchKey = body.search as string;
    if (!searchKey || searchKey.length < 3) {
      return Promise.reject({ err_code: 400, message: "Search key exist or contain atleast 3 characters." });
    }
    return await this.discussionRepository.getDiscussionsBySearching(searchKey);
  }
}