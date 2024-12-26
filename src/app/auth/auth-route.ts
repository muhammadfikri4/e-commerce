import { Router } from "express";
import { login, register } from "./auth-controller";
import { CatchWrapper } from "../../utils/catch-wrapper";
import { validateRequest } from "../../middleware/validateRequest";
import { loginSchema, registerSchema } from "./auth-request";

export const authRoute = Router();

authRoute.post(
  "/register",
  validateRequest(registerSchema),
  CatchWrapper(register)
);
authRoute.post("/login", validateRequest(loginSchema), CatchWrapper(login));
