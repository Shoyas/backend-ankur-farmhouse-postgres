import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { UpcomingOfferServiceFilterableFields } from './upcomingOfferService.constant';
import { UpcomingOfferServiceService } from './upcomingOfferService.service';

const createUpcomingOfferService = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UpcomingOfferServiceService.createUpcomingOfferService(
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Upcoming offer service created successfully',
      data: result,
    });
  }
);

const getAllUpcomingOfferServices = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, UpcomingOfferServiceFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result =
      await UpcomingOfferServiceService.getAllUpcomingOfferServices(
        filters,
        paginationOptions
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Upcoming offer service fetched successfully',
      data: result,
    });
  }
);

const getSingleUpcomingOfferService = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await UpcomingOfferServiceService.getSingleUpcomingOfferService(
        req.params.id
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Upcoming offer service fetched successfully',
      data: result,
    });
  }
);

const updateUpcomingOfferService = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await UpcomingOfferServiceService.updateUpcomingOfferService(
      id,
      payload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Upcoming offer service updated successfully',
      data: result,
    });
  }
);

const deleteUpcomingOfferService = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UpcomingOfferServiceService.deleteUpcomingOfferService(
      req.params.id
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Upcoming offer service deleted successfully',
      data: result,
    });
  }
);

export const UpcomingOfferServiceController = {
  createUpcomingOfferService,
  getAllUpcomingOfferServices,
  getSingleUpcomingOfferService,
  updateUpcomingOfferService,
  deleteUpcomingOfferService,
};
