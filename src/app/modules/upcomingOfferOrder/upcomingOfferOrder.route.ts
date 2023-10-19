import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UpcomingOfferOrderController } from './upcomingOfferOrder.controller';

const router = express.Router();

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  UpcomingOfferOrderController.getAllUpcomingOfferOrders
);

router.get(
  '/all-booking-orders',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UpcomingOfferOrderController.getAllUpcomingOfferOrdersForAdmin
);

router.post(
  '/booking-order',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  UpcomingOfferOrderController.createUpcomingOfferOrder
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UpcomingOfferOrderController.updateUpcomingOfferOrder
);
router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  UpcomingOfferOrderController.deleteUpcomingOfferOrder
);

export const UpcomingOfferOrderRoute = router;
