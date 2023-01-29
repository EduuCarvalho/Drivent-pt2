import {Router} from 'express';
import { authenticateToken } from "@/middlewares";
import { getTicketsType, getTickets } from '@/controllers/tickets-controllers';



const ticketsRouter = Router();

ticketsRouter
/* .all("/*", authenticateToken) */
.get("/types",getTicketsType)
.get("/",getTickets)

export { ticketsRouter };