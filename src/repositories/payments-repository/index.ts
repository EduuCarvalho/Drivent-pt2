import { prisma } from "@/config";


export async function findTicketIdfromPayment(ticketId:number) {
    return prisma.payment.findFirst({
        where: {
         ticketId,
        },
      });
}



const paymentRepository = {
    findTicketIdfromPayment,
}

export default paymentRepository;