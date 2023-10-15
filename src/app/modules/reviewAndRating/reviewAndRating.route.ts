import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewAndRatingController } from './reviewAndRating.controller';
import { ReviewAndRatingValidation } from './reviewAndRating.validation';

const router = express.Router();

router.get('/:id', ReviewAndRatingController.getSingleReviewAndRating);
router.get('/', ReviewAndRatingController.getAllReviewAndRatings);
router.post(
  '/create-review-and-rating',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  validateRequest(ReviewAndRatingValidation.createReviewAndRatingValidation),
  ReviewAndRatingController.createReviewAndRating
);
router.patch(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  validateRequest(ReviewAndRatingValidation.updateReviewAndRatingValidation),
  ReviewAndRatingController.updateReviewAndRating
);
router.delete(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.CUSTOMER
  ),
  ReviewAndRatingController.deleteReviewAndRating
);

export const ReviewAndRatingRoute = router;
