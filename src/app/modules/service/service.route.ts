import express, { NextFunction, Request, Response } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';

const router = express.Router();

router.get('/:id', ServiceController.getSingleService);
router.get('/', ServiceController.getAllServices);
router.post(
  '/create-service',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ServiceValidation.createServiceValidation.parse(
      JSON.parse(req.body.data)
    );
    return ServiceController.createService(req, res, next);
  }

  // validateRequest(ServiceValidation.createServiceValidation),
  // ServiceController.createService
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceValidation.updateServiceValidation),
  ServiceController.updateService
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ServiceController.deleteService
);

export const ServiceRoute = router;
