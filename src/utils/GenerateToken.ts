import Jwt from "jsonwebtoken";
import { config } from "../libs";

export const GenerateToken = (customerId: string) => {
  return Jwt.sign(
    {
      customerId,
    },
    config.JWT_SECRET as string,
    {
      expiresIn: config.JWT_EXPIRES,
    }
  );
};
