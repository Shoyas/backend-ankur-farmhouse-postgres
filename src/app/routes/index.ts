import express from 'express';
import { BlogRoute } from '../modules/blog/blog.route';
import { CategoryRoute } from '../modules/category/category.route';
import { FeedbackRoute } from '../modules/feedback/feedback.route';
import { OrderRoute } from '../modules/order/order.route';
import { ReviewAndRatingRoute } from '../modules/reviewAndRating/reviewAndRating.route';
import { ServiceRoute } from '../modules/service/service.route';
import { UpcomingOfferOrderRoute } from '../modules/upcomingOfferOrder/upcomingOfferOrder.route';
import { UpcomingOfferServiceRoute } from '../modules/upcomingOfferService/upcomingOfferService.route';
import { AuthRoute } from '../modules/user/auth.route';
import { UserRoute } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/feedbacks',
    route: FeedbackRoute,
  },
  {
    path: '/blogs',
    route: BlogRoute,
  },
  {
    path: '/categories',
    route: CategoryRoute,
  },
  {
    path: '/services',
    route: ServiceRoute,
  },
  {
    path: '/upcoming-offer-services',
    route: UpcomingOfferServiceRoute,
  },
  {
    path: '/reviews-and-ratings',
    route: ReviewAndRatingRoute,
  },
  {
    path: '/orders',
    route: OrderRoute,
  },
  {
    path: '/upcoming-offer-orders',
    route: UpcomingOfferOrderRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
