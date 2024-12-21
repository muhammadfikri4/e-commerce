import { Router, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../utils/ErrorCode";
import { MESSAGES } from "../utils/Messages";
import { customersRoute } from "../app/customers/customers.route";
import { authRoute } from "../app/auth/auth-route";
import { profileRoute } from "../app/profile/profile-route";
import { categoryRoute } from "../app/categories/categories-route";
import { VerifyToken } from "../middleware/verifyToken";

const route = Router();

route.use("/customers", customersRoute);
route.use("/auth", authRoute);
route.use("/profile", VerifyToken, profileRoute);
route.use("/category", VerifyToken, categoryRoute);

route.get("/", (_: Request, res: Response) => {
  return res.json({ message: "Hello World 🚀" });
});

route.use("*", (_: Request, res: Response) => {
  return res.status(404).json({
    status: 404,
    code: MESSAGE_CODE.NOT_FOUND,
    message: MESSAGES.ERROR.NOT_FOUND.ROUTE,
  });
});

export default route;
