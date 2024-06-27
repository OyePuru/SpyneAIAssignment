import mongoose from "mongoose";
import { IDiscussion } from "../interface/discussion.interface";
import { Discussion } from "../models/Discussion"

export class DiscussionRepository {
  create = async (discussion: IDiscussion) => {
    return await new Discussion(discussion).save();
  }

  update = async (id: string, update: any) => {
    return await Discussion.findByIdAndUpdate(id, {
      $set: update
    }, { new: true }).exec();
  }

  findOneByUser = async (userId: any, id: any) => {
    return await Discussion.findOne({ _id: id, createdBy: userId }).exec();
  }

  deleteById = async (id: any) => {
    return await Discussion.findByIdAndDelete(id).exec();
  }

  getDiscussionsByTagId = async (tagId: any) => {
    return await Discussion.aggregate([
      {
        $match: { tags: { $elemMatch: { $eq: new mongoose.Types.ObjectId(tagId) }}}
      },
      {
        $lookup: {
          from: 'media',
          as: 'media',
          foreignField: '_id',
          localField: 'media'
        }
      },
      {
        $lookup: {
          from: 'tag',
          as: 'tags',
          foreignField: '_id',
          localField: 'tag'
        }
      }
    ]).exec();
  }

  getDiscussionsBySearching = async (searchKey: any) => {
    return await Discussion.aggregate([
      {
        $match: { text: { $regex: searchKey, $options: 'i' }}
      },
      {
        $lookup: {
          from: 'media',
          as: 'media',
          foreignField: '_id',
          localField: 'media'
        }
      },
      {
        $lookup: {
          from: 'tag',
          as: 'tags',
          foreignField: '_id',
          localField: 'tag'
        }
      }
    ]).exec();
  }

  likeDiscussion = async (discussionId: any) => {
    await Discussion.findByIdAndUpdate(discussionId, {
      $inc: { likesCount: 1 }
    })
    const response =  await Discussion.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(discussionId) }
      },
      {
        $lookup: {
          from: 'media',
          as: 'media',
          foreignField: '_id',
          localField: 'media'
        }
      },
      {
        $lookup: {
          from: 'tag',
          as: 'tags',
          foreignField: '_id',
          localField: 'tag'
        }
      }
    ]).exec();
    return response[0];
  }

  incrementViewCountInDiscussion = async (discussionId: any) => {
    await Discussion.findByIdAndUpdate(discussionId, {
      $inc: { viewCount: 1 }
    });

    const response = await Discussion.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(discussionId) }
      },
      {
        $lookup: {
          from: 'media',
          as: 'media',
          foreignField: '_id',
          localField: 'media'
        }
      },
      {
        $lookup: {
          from: 'tag',
          as: 'tags',
          foreignField: '_id',
          localField: 'tag'
        }
      }
    ]).exec();
    return response[0];
  }
}