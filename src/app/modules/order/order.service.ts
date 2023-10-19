import { Order, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { orderSearchableFields } from './order.constant';
import { ICreateOrderInput, IOrderFilters } from './order.interface';

const createOrder = async (orderData: ICreateOrderInput): Promise<Order> => {
  const result = await prisma.order.create({
    data: orderData,
    include: {
      user: true,
    },
  });
  return result;
};

const getAllOrders = async (userId: string) => {
  const result = await prisma.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      user: true,
    },
  });

  return result;
};

const getAllOrdersForAdmin = async (
  filters: IOrderFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Order[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: orderSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: any = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions: Prisma.OrderWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.order.findMany({
    include: {
      user: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.order.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateOrder = async (
  id: string,
  payload:
    | (Prisma.Without<
        Prisma.OrderUpdateInput,
        Prisma.OrderUncheckedUpdateInput
      > &
        Prisma.OrderUncheckedUpdateInput)
    | (Prisma.Without<
        Prisma.OrderUncheckedUpdateInput,
        Prisma.OrderUpdateInput
      > &
        Prisma.OrderUpdateInput)
): Promise<Order> => {
  const result = await prisma.order.update({
    where: {
      id,
    },
    include: {
      user: true,
    },
    data: payload,
  });
  return result;
};

const deleteOrder = async (id: string): Promise<Order> => {
  const result = await prisma.order.delete({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getAllOrdersForAdmin,
  updateOrder,
  deleteOrder,
};
