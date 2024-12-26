import { Router } from "express";
import { getProfile } from "./profile-controller";
import { CatchWrapper } from "../../utils/catch-wrapper";

const profileRoute = Router();

profileRoute.get("/", CatchWrapper(getProfile));

export { profileRoute };
