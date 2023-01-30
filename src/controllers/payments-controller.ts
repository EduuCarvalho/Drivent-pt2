import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments.service";
import { Response } from "express";
import httpStatus from "http-status";


export async function getPayment( req: AuthenticatedRequest, res: Response) {
    const { ticketId } = req.query;
    const { userId } = req;
    
    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

    try {
        const payment = await paymentsService.getPaymentId(Number(ticketId), userId)
        return res.status(httpStatus.OK).send(payment);
      } catch (err) {
        if (err.name === "UnauthorizedError") {
          return res.status(httpStatus.UNAUTHORIZED).send(err.message);
        }
    
        if (err.name === "NotFoundError") {
          return res.status(httpStatus.NOT_FOUND).send(err.message);
        }
      }
    
}

export async function postPayment(req: AuthenticatedRequest , res: Response) {
    const { userId } = req;

    try{
      const payment = await paymentsService.postPaymenteProcess(req.body, userId);
      return res.status(httpStatus.OK).send(payment);
    } catch (err) {
      if (err.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send(err.message);
      }
  
      if (err.name === "UnauthorizedError") {
        return res.status(httpStatus.UNAUTHORIZED).send(err.message);
      }

    }
}