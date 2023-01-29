import { AuthenticatedRequest } from "@/middlewares";
import { Response } from 'express';
import ticketsService from "@/services/tickets.service";
import httpStatus from "http-status";


export async function getTicketsType (req: AuthenticatedRequest, res: Response){

    try{
        const tickets = await ticketsService.getTypes();
        return res.status(httpStatus.OK).send(tickets)
    } catch (err) {
        return res.sendStatus(httpStatus.NO_CONTENT)
    }
}

export async function getTickets (req: AuthenticatedRequest, res: Response){
    const userId = req.userId;

    try{
        const ticket = await ticketsService.getUserByID(userId);
        return res.status(httpStatus.OK).send(ticket);
    } catch (error) {
        if (error.name === "NotFoundError") {
          return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
    
        return res.sendStatus(httpStatus.NO_CONTENT);
      }

}