"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_route_1 = require("../modules/blog/blog.route");
const category_route_1 = require("../modules/category/category.route");
const feedback_route_1 = require("../modules/feedback/feedback.route");
const order_route_1 = require("../modules/order/order.route");
const reviewAndRating_route_1 = require("../modules/reviewAndRating/reviewAndRating.route");
const service_route_1 = require("../modules/service/service.route");
const upcomingOfferOrder_route_1 = require("../modules/upcomingOfferOrder/upcomingOfferOrder.route");
const upcomingOfferService_route_1 = require("../modules/upcomingOfferService/upcomingOfferService.route");
const auth_route_1 = require("../modules/user/auth.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/users',
        route: user_route_1.UserRoute,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/feedbacks',
        route: feedback_route_1.FeedbackRoute,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoute,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoute,
    },
    {
        path: '/services',
        route: service_route_1.ServiceRoute,
    },
    {
        path: '/upcoming-offer-services',
        route: upcomingOfferService_route_1.UpcomingOfferServiceRoute,
    },
    {
        path: '/reviews-and-ratings',
        route: reviewAndRating_route_1.ReviewAndRatingRoute,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoute,
    },
    {
        path: '/upcoming-offer-orders',
        route: upcomingOfferOrder_route_1.UpcomingOfferOrderRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
