import { Blog, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IUploadFile } from '../../../interfaces/file';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { blogSearchableFields } from './blog.constant';
import { IBlogFilters } from './blog.interface';

/*
const createBlog = async (blogData: Blog): Promise<Blog> => {
  const result = await prisma.blog.create({
    data: blogData,
    include: {
      user: true,
    },
  });

  return result;
};
*/
const createBlog = async (blogData: Blog, file: IUploadFile) => {
  const uploadedBlogImage = await FileUploadHelper.uploadToCloudinary(file);
  if (!uploadedBlogImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Image upload failed');
  }
  // console.log('Data: ', blogData);
  const result = await prisma.blog.create({
    data: {
      ...blogData,
      contentImg: uploadedBlogImage.secure_url as string,
    },
    include: {
      user: true,
    },
  });
  return result;
};

const getAllBlogs = async (
  filters: IBlogFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Blog[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;
  console.log('Search Term: ', searchTerm);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: blogSearchableFields.map(field => ({
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

  const sortConditions: any = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions: Prisma.BlogWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.blog.findMany({
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

  const total = await prisma.blog.count({
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

const getSingleBlog = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<Blog>
): Promise<Blog> => {
  const result = await prisma.blog.update({
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

const deleteBlog = async (id: string): Promise<Blog> => {
  const result = await prisma.blog.delete({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
