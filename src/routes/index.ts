import { Router, type Request, type Response } from "express";
import { MESSAGE_CODE } from "../utils/ErrorCode";
import { MESSAGES } from "../utils/Messages";
import { customersRoute } from "app/customers/customers.route";

const route = Router();

route.use("/customers", customersRoute);

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
