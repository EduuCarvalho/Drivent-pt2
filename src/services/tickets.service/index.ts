import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/tickets-repository";

async function getTypes() {
    return await ticketRepository.findManyTypes();
}

async function getUserByID(userId: number) {
    const checkEnrollments = await enrollmentRepository.findByUserId(userId);
    if (!checkEnrollments) throw notFoundError();
  
    const userTicket = await ticketRepository.findTicketByEnrollmentID(checkEnrollments.id);
    if (!userTicket) throw notFoundError();
  
    return await ticketRepository.findUniqueWithTicketType(checkEnrollments.id);
  }


const ticketsService = {
    getTypes,
    getUserByID,
}

export default ticketsService;