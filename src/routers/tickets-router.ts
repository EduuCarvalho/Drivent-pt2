import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsType, getTickets, postTicket } from "@/controllers/tickets-controllers";
import { postTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsType)
  .get("/", getTickets)
  .post("/", validateBody(postTicketSchema), postTicket);

export { ticketsRouter };
