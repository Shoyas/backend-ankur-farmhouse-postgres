import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  PaymentController.getAllPayment
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  PaymentController.getSinglePaymentById
),
  router.post('/init', PaymentController.initPayment);
router.post('/webhook', PaymentController.webhook);

export const PaymentRoutes = router;
