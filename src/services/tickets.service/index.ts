import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository, { CreateTicketParams } from "@/repositories/tickets-repository";

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

async function insertTicket(userId: number, body: { ticketTypeId: number }) {
  const checkEnrollments = await enrollmentRepository.findByUserId(userId);
  if (!checkEnrollments) throw notFoundError();

  const data: CreateTicketParams = {
    ticketTypeId: body.ticketTypeId,
    enrollmentId: checkEnrollments.id,
    status: "RESERVED",
  };
  return await ticketRepository.createTicket(data);
}
const ticketsService = {
  getTypes,
  getUserByID,
  insertTicket
};

export default ticketsService;
