import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments.service";
import { Response } from "express";
import httpStatus from "http-status";


export async function getPayment( req: AuthenticatedRequest, res: Response) {

    const ticketId = req.query;
    const userId = req;
    
    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

    try {
        const payments = await paymentsService.getPaymentId(Number(ticketId), Number(userId))
        return res.status(httpStatus.OK).send(payments);
      } catch (error) {
        if (error.name === "UnauthorizedError") {
          return res.status(httpStatus.UNAUTHORIZED).send(error.message);
        }
    
        if (error.name === "NotFoundError") {
          return res.status(httpStatus.NOT_FOUND).send(error.message);
        }
    
        return res.sendStatus(httpStatus.NO_CONTENT);
      }
    
}