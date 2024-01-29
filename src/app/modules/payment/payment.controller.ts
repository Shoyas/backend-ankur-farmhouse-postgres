import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paymentFilterableFields } from './payment.constant';
import { PaymentService } from './payment.service';

const initPayment = async (req: Request, res: Response, next: NextFunction) => {
  const result = await PaymentService.initPayment(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment init successfully',
    data: result,
  });
};

const webhook = async (req: Request, res: Response, next: NextFunction) => {
  const result = await PaymentService.webhook(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment verified',
    data: result,
  });
};

const getAllPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = pick(req.query, paymentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await PaymentService.getAllPayment(
      filters,
      paginationOptions
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Payments is getting successfully',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getSinglePaymentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await PaymentService.getSinglePaymentById(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Payment is getting successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const PaymentController = {
  initPayment,
  webhook,
  getAllPayment,
  getSinglePaymentById,
};
