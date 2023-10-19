"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingOfferOrderRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const upcomingOfferOrder_controller_1 = require("./upcomingOfferOrder.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), upcomingOfferOrder_controller_1.UpcomingOfferOrderController.getAllUpcomingOfferOrders);
router.get('/all-booking-orders', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), upcomingOfferOrder_controller_1.UpcomingOfferOrderController.getAllUpcomingOfferOrdersForAdmin);
router.post('/booking-order', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), upcomingOfferOrder_controller_1.UpcomingOfferOrderController.createUpcomingOfferOrder);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), upcomingOfferOrder_controller_1.UpcomingOfferOrderController.updateUpcomingOfferOrder);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), upcomingOfferOrder_controller_1.UpcomingOfferOrderController.deleteUpcomingOfferOrder);
exports.UpcomingOfferOrderRoute = router;
