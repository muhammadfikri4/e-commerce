import { Router } from "express";
import { login, register } from "./auth-controller";
import { CatchWrapper } from "../../utils/catch-wrapper";

const authRoute = Router();

authRoute.post("/register", CatchWrapper(register));
authRoute.post("/login", CatchWrapper(login));

export { authRoute };
