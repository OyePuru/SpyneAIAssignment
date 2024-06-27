import { ICreateMedia } from "../interface/media.interface"
import { Media } from "../models/Media"

export class MediaRepository {
  create = async (media: ICreateMedia) => {
    return await new Media(media).save();
  }
}