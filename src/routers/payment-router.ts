import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayment } from "@/controllers/payments-controller";

const paymentRouter = Router();

paymentRouter
.all("/*",authenticateToken)
.get("/",getPayment)

export {paymentRouter};
