import prisma from '../../../shared/prisma';
import { sslService } from '../ssl/ssl.service';

const initPayment = async (data: any) => {
  const paymentSession = await sslService.initPayment({
    total_amount: data.total_amount,
    tran_id: data.tran_id, // use unique tran_id for each api call
    product_name: data.product_name,
    product_category: data.product_category,
    cus_name: data.cus_name,
    cus_email: data.cus_email,
    cus_add1: data.cus_add1,
    cus_add2: data.cus_add2,
    cus_city: data.cus_city,
    cus_state: data.cus_state,
    cus_postcode: data.cus_postcode,
    cus_country: data.cus_country,
    cus_phone: data.cus_phone,
    ship_name: data.ship_name,
    ship_add1: data.ship_add1,
    ship_add2: data.ship_add2,
    ship_city: data.ship_city,
    ship_state: data.ship_state,
    ship_postcode: data.ship_postcode,
    ship_country: data.ship_country,
  });
  await prisma.payment.create({
    data: {
      amount: data.total_amount,
      transactionId: data.tran_id,
      userId: data.userId,
    },
    include: {
      user: true,
    },
  });
  return paymentSession.redirectGatewayURL;
};

const webhook = async (payload: any) => {
  const result = await sslService.validate(payload);
  return 'Ok';
};

export const PaymentService = {
  initPayment,
  webhook,
};
