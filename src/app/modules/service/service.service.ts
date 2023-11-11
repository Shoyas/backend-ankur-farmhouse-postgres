import { Prisma, Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { serviceSearchableFields } from './service.constant';
import { IServiceFilters } from './service.interface';

/*
const createService = async (serviceData: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data: serviceData,
  });
  return result; 
};
*/
const createService = async (serviceData: Service, file: IUploadFile) => {
  const uploadedServiceImage = await FileUploadHelper.uploadToCloudinary(file);
  if (!uploadedServiceImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
  }
  const result = await prisma.service.create({
    data: {
      ...serviceData,
      serviceImg: uploadedServiceImage.secure_url as string,
    },
    include: {
      category: true,
      ReviewAndRating: true,
    },
  });
};

const getAllServices = async (
  filters: IServiceFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
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

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.service.findMany({
    include: {
      category: true,
      ReviewAndRating: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.service.count({
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

const getSingleService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      ReviewAndRating: true,
    },
  });
  return result;
};

const updateService = async (
  id: string,
  payload: Partial<Service>
): Promise<Service> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    include: {
      category: true,
      ReviewAndRating: true,
    },
    data: payload,
  });

  return result;
};

const deleteService = async (id: string): Promise<Service> => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
    include: {
      category: true,
      ReviewAndRating: true,
    },
  });
  return result;
};

export const ServiceService = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
