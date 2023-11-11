import { Prisma, upcoming_offer_service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { UpcomingOfferServiceSearchableFields } from './upcomingOfferService.constant';
import { IUpcomingOfferServiceFilters } from './upcomingOfferService.interface';

const createUpcomingOfferService = async (
  serviceData: upcoming_offer_service,
  file: IUploadFile
): Promise<upcoming_offer_service> => {
  const uploadedUpcomingOfferServiceImage =
    await FileUploadHelper.uploadToCloudinary(file);
  if (!uploadedUpcomingOfferServiceImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload Failed');
  }
  const result = await prisma.upcoming_offer_service.create({
    data: {
      ...serviceData,
      serviceImg: uploadedUpcomingOfferServiceImage.secure_url as string,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const getAllUpcomingOfferServices = async (
  filters: IUpcomingOfferServiceFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<upcoming_offer_service[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: UpcomingOfferServiceSearchableFields.map(field => ({
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

  const { minPrice, maxPrice } = paginationOptions;
  const query: any = {};

  if (minPrice !== undefined) {
    query.price = { ...query.price, $gte: minPrice };
  }
  if (maxPrice !== undefined) {
    query.price = { ...query.price, $lte: maxPrice };
  }

  const whereConditions: Prisma.upcoming_offer_serviceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.upcoming_offer_service.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.upcoming_offer_service.count({
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

const getSingleUpcomingOfferService = async (
  id: string
): Promise<upcoming_offer_service | null> => {
  const result = await prisma.upcoming_offer_service.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const updateUpcomingOfferService = async (
  id: string,
  payload: Partial<upcoming_offer_service>
): Promise<upcoming_offer_service> => {
  const result = await prisma.upcoming_offer_service.update({
    where: {
      id,
    },
    include: {
      category: true,
    },
    data: payload,
  });

  return result;
};

const deleteUpcomingOfferService = async (
  id: string
): Promise<upcoming_offer_service> => {
  const result = await prisma.upcoming_offer_service.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const UpcomingOfferServiceService = {
  createUpcomingOfferService,
  getAllUpcomingOfferServices,
  getSingleUpcomingOfferService,
  updateUpcomingOfferService,
  deleteUpcomingOfferService,
};
