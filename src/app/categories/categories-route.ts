import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createCategorySchema } from "./categories-request";
import { createCategory, getCategories } from "./categories-controller";

const categoryRoute = Router();

categoryRoute.post("/", validateRequest(createCategorySchema), createCategory);
categoryRoute.get("/", getCategories);

export { categoryRoute };
