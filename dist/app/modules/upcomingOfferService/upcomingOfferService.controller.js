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
exports.UpcomingOfferServiceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const upcomingOfferService_constant_1 = require("./upcomingOfferService.constant");
const upcomingOfferService_service_1 = require("./upcomingOfferService.service");
const createUpcomingOfferService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield upcomingOfferService_service_1.UpcomingOfferServiceService.createUpcomingOfferService(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Upcoming offer service created successfully',
        data: result,
    });
}));
const getAllUpcomingOfferServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, upcomingOfferService_constant_1.UpcomingOfferServiceFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield upcomingOfferService_service_1.UpcomingOfferServiceService.getAllUpcomingOfferServices(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Upcoming offer service fetched successfully',
        data: result,
    });
}));
const getSingleUpcomingOfferService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield upcomingOfferService_service_1.UpcomingOfferServiceService.getSingleUpcomingOfferService(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Upcoming offer service fetched successfully',
        data: result,
    });
}));
const updateUpcomingOfferService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield upcomingOfferService_service_1.UpcomingOfferServiceService.updateUpcomingOfferService(id, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Upcoming offer service updated successfully',
        data: result,
    });
}));
const deleteUpcomingOfferService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield upcomingOfferService_service_1.UpcomingOfferServiceService.deleteUpcomingOfferService(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Upcoming offer service deleted successfully',
        data: result,
    });
}));
exports.UpcomingOfferServiceController = {
    createUpcomingOfferService,
    getAllUpcomingOfferServices,
    getSingleUpcomingOfferService,
    updateUpcomingOfferService,
    deleteUpcomingOfferService,
};
