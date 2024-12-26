import { Router } from "express";
import { login, register } from "./auth-controller";
import { CatchWrapper } from "../../utils/catch-wrapper";

export const authRoute = Router();

authRoute.post("/register", CatchWrapper(register));
authRoute.post("/login", CatchWrapper(login));

