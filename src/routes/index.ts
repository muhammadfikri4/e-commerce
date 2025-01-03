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
import { paymentMethodRoute } from "../app/payment-method/payment-method-route";
import { addressRoute } from "../app/address/address-route";
import { courierRoute } from "../app/courier/courier-route";
import { orderRoute } from "../app/orders/orders-route";

const route = Router();

route.use("/customers", customersRoute);
route.use("/auth", authRoute);
route.use("/profile", verifyToken, profileRoute);
route.use("/category", verifyToken, categoryRoute);
route.use("/products", verifyToken, productRoute);
route.use("/chart", verifyToken, chartRoute);
route.use("/payment-method", verifyToken, paymentMethodRoute);
route.use("/address", verifyToken, addressRoute);
route.use("/courier", verifyToken, courierRoute);
route.use("/orders", verifyToken, orderRoute);

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
