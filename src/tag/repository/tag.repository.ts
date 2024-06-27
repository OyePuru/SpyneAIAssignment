import { ICreateTag } from "../interface/tag.interface";
import { Tag } from "../models/Tag";

export class TagRepository {
  create = async (tag: ICreateTag) => {
    return await new Tag(tag).save();
  }

  findOneByName = async (tagName: string) => {
    return await Tag.findOne({ name: tagName}).exec();
  }

  incrementTagUsage = async (id: any) => {
    return await Tag.findByIdAndUpdate(id, {
      $inc: { timeUsed: 1 }
    }, { new: true }).exec();
  }
}