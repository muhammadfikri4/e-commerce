import { Router } from "express";
import { createCustomer } from "./customers-controller";
import { CatchWrapper } from "../../utils/catch-wrapper";

export const customersRoute = Router();

customersRoute.post("/", CatchWrapper(createCustomer));

