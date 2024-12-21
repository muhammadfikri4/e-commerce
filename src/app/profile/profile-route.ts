import { Router } from "express";
import { getProfile } from "./profile-controller";

const profileRoute = Router();

profileRoute.get("/", getProfile);

export { profileRoute };
