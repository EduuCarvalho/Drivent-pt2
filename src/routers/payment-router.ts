import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayment, postPayment } from "@/controllers/payments-controller";
import { paymentSchema } from "@/schemas";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", getPayment)
  .post("/process", validateBody(paymentSchema), postPayment);

export { paymentRouter };
