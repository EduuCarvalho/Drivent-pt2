import { AuthenticatedRequest } from "@/middlewares";
import { Response } from 'express';
import ticketsService from "@/services/tickets.service";
import httpStatus from "http-status";


export async function getTicketsType (req: AuthenticatedRequest, res: Response){

    try{
        const tickets = await ticketsService.getTypes();
        return res.status(httpStatus.OK).send(tickets)
    } catch (err) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export async function getTickets (req: AuthenticatedRequest, res: Response){
    const userId = req.userId;

    try{
        const ticket = await ticketsService.getUserByID(userId);
        return res.status(httpStatus.OK).send(ticket);
    } catch (err) {
        if (err.name === "NotFoundError") {
          return res.status(httpStatus.NOT_FOUND).send(err.message);
        }
      }
}

export async function postTicket(req: AuthenticatedRequest, res: Response){
    const {userId, body} = req;

    try{
        const ticket = await ticketsService.insertTicket(userId,body);
        return res.status(httpStatus.CREATED).send(ticket);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(error.message);
        }

        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}