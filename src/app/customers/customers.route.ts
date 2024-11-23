import { Router } from "express";
import { createCustomer } from "./customers-controller";

const customersRoute = Router();

customersRoute.post("/", createCustomer);

export { customersRoute };
