import { prisma } from "@/config";



export async function findTicketIdfromPayment(ticketId: number) {
    return prisma.payment.findFirst({
        where: {
            ticketId,
        },
    });
}

export type CreatePaymentBody = {
    ticketId: number;
    cardData: {
      issuer: string;
      number: string;
      name: string;
      expirationDate: string;
      cvv: string;
    };
  };
  
async function createPayment(body: CreatePaymentBody, value: number) {
    return prisma.payment.create({
      data: {
        ticketId: body.ticketId,
        cardIssuer: body.cardData.issuer,
        cardLastDigits: body.cardData.number.slice(-4),
        value,
      },
    });
  }
  

const paymentRepository = {
    findTicketIdfromPayment,
    createPayment
}

export default paymentRepository