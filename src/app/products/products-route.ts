import { Router } from "express";
import { createProduct } from "./products-controller";

export const productRoute = Router();

productRoute.post("/", createProduct);
