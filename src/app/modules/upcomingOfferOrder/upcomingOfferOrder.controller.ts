import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { paginationFields } from '../../../constants/pagination';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { upcomingOfferOrderFilterableFields } from './upcomingOfferOrder.constant';
import { ICreateUpcomingOfferOrderInput } from './upcomingOfferOrder.interface';
import { UpcomingOfferOrderService } from './upcomingOfferOrder.service';

const createUpcomingOfferOrder = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    let verifiedUser = null;
    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
    req.user = verifiedUser; // role  , userid
    const userId = req.user.userId;

    const orderData: ICreateUpcomingOfferOrderInput = {
      userId: userId,
      upcomingOfferServices: req.body.upcomingOfferServices,
      upcomingOfferStatus: req.body.upcomingOfferStatus,
      takingScheduledDate: req.body.takingScheduledDate,
      createdAt: new Date(),
    };

    const result = await UpcomingOfferOrderService.createUpcomingOfferOrder(
      orderData
    );
    // console.log('Create Order: ', result);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order booking successfully',
      data: result,
    });
  }
);

const getAllUpcomingOfferOrders = catchAsync(
  async (req: Request, res: Response) => {
    // console.log('Request Headers: ', req.headers);
    // const token: any = req.headers.authorization;
    // console.log('get Order token: ', token);
    const user: any = req.user;
    // console.log('Ordering UserID: ', user.userId);

    const result = await UpcomingOfferOrderService.getAllUpcomingOfferOrders(
      user.userId
    );
    //   console.log('get Order: ', result);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking orders retrieved successfully',
      data: result,
    });
  }
);

const getAllUpcomingOfferOrdersForAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, upcomingOfferOrderFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result =
      await UpcomingOfferOrderService.getAllUpcomingOfferOrdersForAdmin(
        filters,
        paginationOptions
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking Orders retrieved successfully',
      data: result,
    });
  }
);

const updateUpcomingOfferOrder = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await UpcomingOfferOrderService.updateUpcomingOfferOrder(
      id,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order updated successfully',
      data: result,
    });
  }
);

const deleteUpcomingOfferOrder = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UpcomingOfferOrderService.deleteUpcomingOfferOrder(
      req.params.id
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Booking order deleted successfully',
      data: result,
    });
  }
);

export const UpcomingOfferOrderController = {
  createUpcomingOfferOrder,
  getAllUpcomingOfferOrders,
  getAllUpcomingOfferOrdersForAdmin,
  updateUpcomingOfferOrder,
  deleteUpcomingOfferOrder,
};
