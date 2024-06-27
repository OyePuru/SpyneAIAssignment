import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../user/repository/user.repository';
import { AuthenticatedRequest } from '../../utility/interfaces/AuthenticatedRequest.interface';

const userRepository = new UserRepository();

export const verifyAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { authToken } = req.cookies;
    
    if (!authToken) {
      return res.status(401).send({ success: false, error: 'Authentication token missing' });
    }

    const decodedToken: any = jwt.verify(authToken, process.env.SECRET!);
    if (!decodedToken || decodedToken === "") {
      return res.status(401).send({ success: false, error: 'Something went wrong. Please login again.' });
    }
    
    const userId = decodedToken._id;
    const user = await userRepository.findById(userId);

    if (!user) {
      return res.status(404).send({ success: false, error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err: any) {
    console.error('Error verifying auth:', err);
    return res.status(500).send({ success: false, error: 'Internal server error' });
  }
};
