import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/tickets-repository";

async function getTypes() {
    return await ticketRepository.findManyTypes();
}

async function getUserByID(userId: number) {
    const enrollments = await enrollmentRepository.findByUserId(userId);
    if (!enrollments) throw notFoundError();
  
    const userTicket = await ticketRepository.findTicketByEnrollmentID(enrollments.id);
    if (!userTicket) throw notFoundError();
  
    return await ticketRepository.findUniqueWithTicketType(enrollments.id);
  }


const ticketsService = {
    getTypes,
    getUserByID,
}

export default ticketsService;