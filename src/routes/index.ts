import { Router, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../utils/error-code";
import { customersRoute } from "../app/customers/customers.route";
import { authRoute } from "../app/auth/auth-route";
import { profileRoute } from "../app/profile/profile-route";
import { categoryRoute } from "../app/categories/categories-route";
import { verifyToken } from "../middleware/verifyToken";
import { MESSAGES } from "../utils/messages";
import { productRoute } from "../app/products/products-route";
import { chartRoute } from "../app/chart/chart-route";

const route = Router();

route.use("/customers", customersRoute);
route.use("/auth", authRoute);
route.use("/profile", verifyToken, profileRoute);
route.use("/category", verifyToken, categoryRoute);
route.use("/products", verifyToken, productRoute);
route.use("/chart", verifyToken, chartRoute);

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
