import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { feedbackFilterableFields } from './feedback.constant';
import { FeedbackService } from './feedback.service';

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.createFeedback(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback created successfully',
    data: result,
  });
});

const getAllFeedbacks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, feedbackFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FeedbackService.getAllFeedbacks(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedbacks retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const updateSingleFeedback = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await FeedbackService.updateSingleFeedback(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback updated successfully',
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.deleteFeedback(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Feedback deleted successfully',
    data: result,
  });
});

export const FeedbackController = {
  createFeedback,
  getAllFeedbacks,
  updateSingleFeedback,
  deleteFeedback,
};
