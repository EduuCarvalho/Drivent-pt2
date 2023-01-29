import { prisma } from "@/config";


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
  
const ticketRepository = {
    findManyTypes,
    findTicketByEnrollmentID,
    findUniqueWithTicketType
}

export default ticketRepository;