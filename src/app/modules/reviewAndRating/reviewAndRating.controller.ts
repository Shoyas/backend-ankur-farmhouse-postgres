import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { reviewAndRatingFilterableFields } from './reviewAndRating.constant';
import { ReviewAndRatingService } from './reviewAndRating.service';

const createReviewAndRating = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewAndRatingService.createReviewAndRating(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review and Rating created successfully',
      data: result,
    });
  }
);

const getAllReviewAndRatings = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, reviewAndRatingFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await ReviewAndRatingService.getAllReviewAndRatings(
      filters,
      paginationOptions
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review and Rating fetched successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleReviewAndRating = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewAndRatingService.getSingleReviewAndRating(
      req.params.id
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review and Rating fetched successfully',
      data: result,
    });
  }
);

const updateReviewAndRating = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await ReviewAndRatingService.updateReviewAndRating(
      id,
      payload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review and Rating updated successfully',
      data: result,
    });
  }
);

const deleteReviewAndRating = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewAndRatingService.deleteReviewAndRating(
      req.params.id
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review and Rating deleted successfully',
      data: result,
    });
  }
);

export const ReviewAndRatingController = {
  createReviewAndRating,
  getAllReviewAndRatings,
  getSingleReviewAndRating,
  updateReviewAndRating,
  deleteReviewAndRating,
};
