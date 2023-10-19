"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const reviewAndRating_controller_1 = require("./reviewAndRating.controller");
const reviewAndRating_validation_1 = require("./reviewAndRating.validation");
const router = express_1.default.Router();
router.get('/:id', reviewAndRating_controller_1.ReviewAndRatingController.getSingleReviewAndRating);
router.get('/', reviewAndRating_controller_1.ReviewAndRatingController.getAllReviewAndRatings);
router.post('/create-review-and-rating', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), (0, validateRequest_1.default)(reviewAndRating_validation_1.ReviewAndRatingValidation.createReviewAndRatingValidation), reviewAndRating_controller_1.ReviewAndRatingController.createReviewAndRating);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), (0, validateRequest_1.default)(reviewAndRating_validation_1.ReviewAndRatingValidation.updateReviewAndRatingValidation), reviewAndRating_controller_1.ReviewAndRatingController.updateReviewAndRating);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), reviewAndRating_controller_1.ReviewAndRatingController.deleteReviewAndRating);
exports.ReviewAndRatingRoute = router;
