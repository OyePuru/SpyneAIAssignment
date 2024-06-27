import { Response } from "express";
import { AuthenticatedRequest } from "../../utility/interfaces/AuthenticatedRequest.interface";
import { DiscussionService } from "../service/discussion.service";
import { CreateDiscussionValidation, UpdateDiscussionValidation } from "../validation/discussion.validation";

export class DiscussionController {
  private discussionService: DiscussionService
  constructor () {
    this.discussionService = new DiscussionService();
  }

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const data = JSON.parse(req.body.data);
      const { error } = CreateDiscussionValidation(data);
      if (error) {
        return res.status(400).send({ success: false, error: error.message });
      }
      const response = await this.discussionService.create(data, req.user!, req.file);
      return res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }

  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { error } = UpdateDiscussionValidation(req.body);
      if (error) {
        return res.status(400).send({ success: false, error: error.message });
      }
      const discussionId: string = req.params.id;
      const response = await this.discussionService.update(req.body, req.user!, discussionId);
      return res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const discussionId = req.params.id as string;
      await this.discussionService.delete(discussionId, req.user?._id!);
      return res.status(200).send({ success: true, message: "Discussion deleted." });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }

  getDiscussionByTagIds = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const tagId = req.params.id as string;
      const response = await this.discussionService.getDiscussionsByTagId(tagId);
      return res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }


  getDiscussionBySearching = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const response = await this.discussionService.getDiscussionsBySearching(req.body);
      return res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }

  likeDiscussion =  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const response = await this.discussionService.likeDiscussion(req.body.id);
      return res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }

  incrementViewCountInDiscussion =  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const response = await this.discussionService.incrementViewCountInDiscussion(req.body.id);
      return res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }
}