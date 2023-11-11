import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UpcomingOfferServiceController } from './upcomingOfferService.controller';
import { UpcomingOfferServiceValidation } from './upcomingOfferService.validation';

const router = express.Router();

router.get(
  '/:id',
  UpcomingOfferServiceController.getSingleUpcomingOfferService
);
router.get('/', UpcomingOfferServiceController.getAllUpcomingOfferServices);
router.post(
  '/create-upcoming-offer-service',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body =
      UpcomingOfferServiceValidation.createUpcomingOfferServiceValidation.parse(
        JSON.parse(req.body.data)
      );
    return UpcomingOfferServiceController.createUpcomingOfferService(
      req,
      res,
      next
    );
  }
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(
    UpcomingOfferServiceValidation.updateUpcomingOfferServiceValidation
  ),
  UpcomingOfferServiceController.updateUpcomingOfferService
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UpcomingOfferServiceController.deleteUpcomingOfferService
);

export const UpcomingOfferServiceRoute = router;
