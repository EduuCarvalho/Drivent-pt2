import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payments-repository"
import ticketRepository from "@/repositories/tickets-repository";


async function getPaymentId(ticketId: number, userId: number) {

    const checkTicket = await ticketRepository.findTiketById(ticketId);
    if(!checkTicket) throw notFoundError();

    const checkEnrollment = await enrollmentRepository.findByUserId(userId);
    if (checkTicket.enrollmentId !== checkEnrollment.id) throw unauthorizedError();

    return await paymentRepository.findTicketIdfromPayment(ticketId);
};




const paymentsService = {
    getPaymentId,
}

export default paymentsService;