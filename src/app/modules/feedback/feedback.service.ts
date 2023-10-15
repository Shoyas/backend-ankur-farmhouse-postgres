import { Feedback, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { feedbackSearchableFields } from './feedback.constant';
import { IFeedbackFilters } from './feedback.interface';

const createFeedback = async (feedbackData: Feedback): Promise<Feedback> => {
  const result = await prisma.feedback.create({
    data: feedbackData,
    include: {
      user: true,
    },
  });

  return result;
};

const getAllFeedbacks = async (
  filters: IFeedbackFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Feedback[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: feedbackSearchableFields.map(field => ({
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

  const whereConditions: Prisma.FeedbackWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.feedback.findMany({
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

  const total = await prisma.feedback.count({
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

const updateSingleFeedback = async (
  id: string,
  payload: Partial<Feedback>
): Promise<Feedback> => {
  const result = await prisma.feedback.update({
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

const deleteFeedback = async (id: string): Promise<Feedback> => {
  const result = await prisma.feedback.delete({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

export const FeedbackService = {
  createFeedback,
  getAllFeedbacks,
  updateSingleFeedback,
  deleteFeedback,
};
