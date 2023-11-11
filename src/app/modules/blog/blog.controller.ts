import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { IUploadFile } from '../../../interfaces/file';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { blogFilterableFields } from './blog.constant';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  console.log('Payload: ', payload);
  const file = req.file as IUploadFile;
  console.log('File: ', file);
  const result = await BlogService.createBlog(payload, file);
  console.log('Result: ', result);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, blogFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  console.log('Filters: ', filters);
  console.log('paginationOptions: ', paginationOptions);
  const result = await BlogService.getAllBlogs(filters, paginationOptions);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blogs retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getSingleBlog(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog fetched successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await BlogService.updateBlog(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlog(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
