import { Router } from "express";
import { register } from "./auth-controller";

const authRoute = Router();

authRoute.post("/register", register);

export { authRoute };
