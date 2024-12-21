import { Router } from "express";
import { VerifyToken } from "../../middleware/verifyToken";
import { getProfile } from "./profile-controller";

const profileRoute = Router();

profileRoute.get("/", VerifyToken, getProfile);

export { profileRoute };
