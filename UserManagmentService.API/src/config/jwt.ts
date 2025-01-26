import jwt from "jsonwebtoken";

export const generateToken = (userId: string) => {
  return jwt.sign({ UserId: userId }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h",
  });
};
