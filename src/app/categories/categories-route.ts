import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createCategorySchema } from "./categories-request";
import { createCategory, getCategories } from "./categories-controller";
import { CatchWrapper } from "../../utils/catch-wrapper";

const categoryRoute = Router();

categoryRoute.post(
  "/",
  validateRequest(createCategorySchema),
  CatchWrapper(createCategory)
);
categoryRoute.get("/", CatchWrapper(getCategories));

export { categoryRoute };
