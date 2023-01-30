import { postPayment } from "@/controllers/payments-controller";
import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository, {CreatePaymentBody} from "@/repositories/payments-repository"
import ticketRepository from "@/repositories/tickets-repository";


async function getPaymentId(ticketId: number, userId: number) {

    const checkTicket = await ticketRepository.findTiketById(ticketId);
    if(!checkTicket) throw notFoundError();

    const checkEnrollment = await enrollmentRepository.findByUserId(userId);
    if (checkTicket.enrollmentId !== checkEnrollment.id) throw unauthorizedError();

    return await paymentRepository.findTicketIdfromPayment(ticketId);
};

async function postPaymenteProcess (body: CreatePaymentBody, userId: number) {
    const checkTicket = await ticketRepository.findTiketById(body.ticketId);
    if(!checkTicket) throw notFoundError();

    const ticketType = await ticketRepository.findTicketTypeById(checkTicket.ticketTypeId)

    const checkEnrollment = await enrollmentRepository.findByUserId(userId);
    if (checkTicket.enrollmentId !== checkEnrollment.id) throw unauthorizedError();

    await ticketRepository.updateTicket(body.ticketId);
    return await paymentRepository.createPayment(body, ticketType.price);
}

const paymentsService = {
    getPaymentId,
    postPaymenteProcess
}

export default paymentsService;