import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findManyTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketByEnrollmentID(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
  });
}

async function findUniqueWithTicketType(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

async function createTicket(data: CreateTicketParams) {
  return prisma.ticket.create({
    data,
    include: {
      TicketType: true
    }
  });
}

async function findTiketById(id: number) {
  return prisma.ticket.findUnique({
    where: { id, }
  });
}

async function findTicketTypeById(id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id,
    },
  });
}

async function updateTicket(id: number) {
  return prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: "PAID",
    },
  });
}

const ticketRepository = {
  findManyTypes,
  findTicketByEnrollmentID,
  findUniqueWithTicketType,
  createTicket,
  findTiketById,
  findTicketTypeById,
  updateTicket
};

export default ticketRepository;
