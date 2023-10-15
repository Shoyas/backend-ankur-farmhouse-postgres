import { Prisma, ReviewAndRating } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { reviewAndRatingSearchableFields } from './reviewAndRating.constant';
import { IReviewAndRatingFilters } from './reviewAndRating.interface';

const createReviewAndRating = async (
  reviewAndRatingData: ReviewAndRating
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.create({
    data: reviewAndRatingData,
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const getAllReviewAndRatings = async (
  filters: IReviewAndRatingFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ReviewAndRating[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: reviewAndRatingSearchableFields.map(field => ({
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

  const whereConditions: Prisma.ReviewAndRatingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.reviewAndRating.findMany({
    include: {
      user: true,
      service: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.reviewAndRating.count({
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

const getSingleReviewAndRating = async (
  id: string
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const updateReviewAndRating = async (
  id: string,
  payload: Partial<ReviewAndRating>
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.update({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
    data: payload,
  });

  return result;
};

const deleteReviewAndRating = async (id: string): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.delete({
    where: {
      id,
    },
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

export const ReviewAndRatingService = {
  createReviewAndRating,
  getAllReviewAndRatings,
  getSingleReviewAndRating,
  updateReviewAndRating,
  deleteReviewAndRating,
};
