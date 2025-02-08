import { Request, Response, NextFunction } from "express";
interface AuthenticatedRequest extends Request {
  user?: any;
  authorization?: string;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // authentication logic
  const token = req.headers["authorization"];

  console.log("authMiddleware");
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};

export default authMiddleware;
