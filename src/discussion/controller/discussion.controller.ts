import { Response } from "express";
import { AuthenticatedRequest } from "../../utility/interfaces/AuthenticatedRequest.interface";
import { DiscussionService } from "../service/discussion.service";

export class DiscussionController {
  private discussionService: DiscussionService
  constructor () {
    this.discussionService = new DiscussionService();
  }

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const response = await this.discussionService.create(JSON.parse(req.body.data), req.user!, req.file);
      return res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }
}