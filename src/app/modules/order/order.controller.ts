import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { paginationFields } from '../../../constants/pagination';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { orderFilterableFields } from './order.constant';
import { ICreateOrderInput } from './order.interface';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const token: any = req.headers.authorization;
  let verifiedUser = null;
  verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  req.user = verifiedUser; // role  , userid
  const userId = req.user.userId;

  const orderData: ICreateOrderInput = {
    userId: userId,
    orderedServices: req.body.orderedServices,
    status: req.body.status,
    createdAt: new Date(),
  };

  const result = await OrderService.createOrder(orderData);
  // console.log('Create Order: ', result);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  // console.log('Request Headers: ', req.headers);
  // const token: any = req.headers.authorization;
  // console.log('get Order token: ', token);
  const user: any = req.user;
  // console.log('Ordering UserID: ', user.userId);

  const result = await OrderService.getAllOrders(user.userId);
  //   console.log('get Order: ', result);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getAllOrdersForAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await OrderService.getAllOrdersForAdmin(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.deleteOrder(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order deleted successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getAllOrdersForAdmin,
  deleteOrder,
};
