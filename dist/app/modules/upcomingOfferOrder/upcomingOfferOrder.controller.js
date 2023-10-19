"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingOfferOrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const pagination_1 = require("../../../constants/pagination");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const upcomingOfferOrder_constant_1 = require("./upcomingOfferOrder.constant");
const upcomingOfferOrder_service_1 = require("./upcomingOfferOrder.service");
const createUpcomingOfferOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    let verifiedUser = null;
    verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    req.user = verifiedUser; // role  , userid
    const userId = req.user.userId;
    const orderData = {
        userId: userId,
        upcomingOfferServices: req.body.upcomingOfferServices,
        upcomingOfferStatus: req.body.upcomingOfferStatus,
        takingScheduledDate: req.body.takingScheduledDate,
        createdAt: new Date(),
    };
    const result = yield upcomingOfferOrder_service_1.UpcomingOfferOrderService.createUpcomingOfferOrder(orderData);
    // console.log('Create Order: ', result);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Order booking successfully',
        data: result,
    });
}));
const getAllUpcomingOfferOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('Request Headers: ', req.headers);
    // const token: any = req.headers.authorization;
    // console.log('get Order token: ', token);
    const user = req.user;
    // console.log('Ordering UserID: ', user.userId);
    const result = yield upcomingOfferOrder_service_1.UpcomingOfferOrderService.getAllUpcomingOfferOrders(user.userId);
    //   console.log('get Order: ', result);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Booking orders retrieved successfully',
        data: result,
    });
}));
const getAllUpcomingOfferOrdersForAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, upcomingOfferOrder_constant_1.upcomingOfferOrderFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield upcomingOfferOrder_service_1.UpcomingOfferOrderService.getAllUpcomingOfferOrdersForAdmin(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Booking Orders retrieved successfully',
        data: result,
    });
}));
const updateUpcomingOfferOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield upcomingOfferOrder_service_1.UpcomingOfferOrderService.updateUpcomingOfferOrder(id, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Order updated successfully',
        data: result,
    });
}));
const deleteUpcomingOfferOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield upcomingOfferOrder_service_1.UpcomingOfferOrderService.deleteUpcomingOfferOrder(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Booking order deleted successfully',
        data: result,
    });
}));
exports.UpcomingOfferOrderController = {
    createUpcomingOfferOrder,
    getAllUpcomingOfferOrders,
    getAllUpcomingOfferOrdersForAdmin,
    updateUpcomingOfferOrder,
    deleteUpcomingOfferOrder,
};
