import { Prisma, UpcomingOfferOrder } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from './../../../shared/prisma';
import { upcomingOfferOrderSearchableFields } from './upcomingOfferOrder.constant';
import {
  ICreateUpcomingOfferOrderInput,
  IUpcomingOfferOrderFilters,
} from './upcomingOfferOrder.interface';

const createUpcomingOfferOrder = async (
  upcomingOfferOrderData: ICreateUpcomingOfferOrderInput
): Promise<UpcomingOfferOrder> => {
  console.log('upcomingOfferOrderData', upcomingOfferOrderData);
  const result = await prisma.upcomingOfferOrder.create({
    data: upcomingOfferOrderData,
    include: {
      user: true,
    },
  });
  return result;
};

const getAllUpcomingOfferOrders = async (userId: string) => {
  const result = await prisma.upcomingOfferOrder.findMany({
    where: {
      userId: userId,
    },
    include: {
      user: true,
    },
  });

  return result;
};

const getAllUpcomingOfferOrdersForAdmin = async (
  filters: IUpcomingOfferOrderFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<UpcomingOfferOrder[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: upcomingOfferOrderSearchableFields.map(field => ({
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

  const whereConditions: Prisma.UpcomingOfferOrderWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.upcomingOfferOrder.findMany({
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

  const total = await prisma.upcomingOfferOrder.count({
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

const updateUpcomingOfferOrder = async (
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
): Promise<UpcomingOfferOrder> => {
  const result = await prisma.upcomingOfferOrder.update({
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

const deleteUpcomingOfferOrder = async (
  id: string
): Promise<UpcomingOfferOrder> => {
  const result = await prisma.upcomingOfferOrder.delete({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

export const UpcomingOfferOrderService = {
  createUpcomingOfferOrder,
  getAllUpcomingOfferOrders,
  getAllUpcomingOfferOrdersForAdmin,
  updateUpcomingOfferOrder,
  deleteUpcomingOfferOrder,
};
