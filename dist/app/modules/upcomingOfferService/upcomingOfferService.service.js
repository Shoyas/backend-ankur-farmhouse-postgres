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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingOfferServiceService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const upcomingOfferService_constant_1 = require("./upcomingOfferService.constant");
const createUpcomingOfferService = (serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.upcoming_offer_service.create({
        data: serviceData,
    });
    return result;
});
const getAllUpcomingOfferServices = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: upcomingOfferService_constant_1.UpcomingOfferServiceSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const { minPrice, maxPrice } = paginationOptions;
    const query = {};
    if (minPrice !== undefined) {
        query.price = Object.assign(Object.assign({}, query.price), { $gte: minPrice });
    }
    if (maxPrice !== undefined) {
        query.price = Object.assign(Object.assign({}, query.price), { $lte: maxPrice });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.upcoming_offer_service.findMany({
        include: {
            category: true,
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.upcoming_offer_service.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleUpcomingOfferService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.upcoming_offer_service.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
const updateUpcomingOfferService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.upcoming_offer_service.update({
        where: {
            id,
        },
        include: {
            category: true,
        },
        data: payload,
    });
    return result;
});
const deleteUpcomingOfferService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.upcoming_offer_service.delete({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
exports.UpcomingOfferServiceService = {
    createUpcomingOfferService,
    getAllUpcomingOfferServices,
    getSingleUpcomingOfferService,
    updateUpcomingOfferService,
    deleteUpcomingOfferService,
};
