"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingOfferServiceRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const upcomingOfferService_controller_1 = require("./upcomingOfferService.controller");
const upcomingOfferService_validation_1 = require("./upcomingOfferService.validation");
const router = express_1.default.Router();
router.get('/:id', upcomingOfferService_controller_1.UpcomingOfferServiceController.getSingleUpcomingOfferService);
router.get('/', upcomingOfferService_controller_1.UpcomingOfferServiceController.getAllUpcomingOfferServices);
router.post('/create-upcoming-offer-service', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(upcomingOfferService_validation_1.UpcomingOfferServiceValidation.createUpcomingOfferServiceValidation), upcomingOfferService_controller_1.UpcomingOfferServiceController.createUpcomingOfferService);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(upcomingOfferService_validation_1.UpcomingOfferServiceValidation.updateUpcomingOfferServiceValidation), upcomingOfferService_controller_1.UpcomingOfferServiceController.updateUpcomingOfferService);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), upcomingOfferService_controller_1.UpcomingOfferServiceController.deleteUpcomingOfferService);
exports.UpcomingOfferServiceRoute = router;
