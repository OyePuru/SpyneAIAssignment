import { ICreateMedia } from "../interface/media.interface"
import { Media } from "../models/Media"

export class MediaRepository {
  create = async (media: ICreateMedia) => {
    return await new Media(media).save();
  }

  findById = async (id: any) => {
    return await Media.findById(id).exec();
  }

  deleteById = async (id: any) => {
    return await Media.findByIdAndDelete(id).exec();
  }
}