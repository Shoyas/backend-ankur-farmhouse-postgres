import { Payment, PaymentStatus, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import prisma from '../../../shared/prisma';
import { sslService } from '../ssl/ssl.service';
import { paymentSearchableFields } from './payment.constant';

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
  if (
    !payload ||
    !payload?.status ||
    payload?.status !== 'VALID' ||
    'VALIDATED'
  ) {
    return {
      message: 'Invalid Payment',
    };
  }
  const result = await sslService.validate(payload);
  if (result?.status !== 'VALID' || 'VALIDATED') {
    return {
      message: 'Payment failed',
    };
  }
  const { tran_id } = result;
  await prisma.payment.updateMany({
    where: {
      transactionId: tran_id,
    },
    data: {
      status: PaymentStatus.PAID,
      paymentGatewayData: payload,
    },
  });

  return {
    message: 'Payment Success',
  };
};

const getAllPayment = async (
  filters: any,
  paginationOptions: any
): Promise<IGenericResponse<Payment[]>> => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: paymentSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.PaymentWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.payment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.payment.count({
    where: whereConditions,
  });
  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSinglePaymentById = async (id: string): Promise<Payment | null> => {
  const result = await prisma.payment.findUnique({
    where: { id },
  });
  return result;
};

export const PaymentService = {
  initPayment,
  webhook,
  getAllPayment,
  getSinglePaymentById,
};
