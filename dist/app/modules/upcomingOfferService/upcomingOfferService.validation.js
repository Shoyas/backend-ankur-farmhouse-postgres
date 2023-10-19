"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingOfferServiceValidation = void 0;
const zod_1 = require("zod");
const createUpcomingOfferServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        unit: zod_1.z.string({
            required_error: 'Unit is required',
        }),
        startDate: zod_1.z.string({
            required_error: 'Start date is required',
        }),
        startTime: zod_1.z.string({
            required_error: 'Start time is required',
        }),
        endDate: zod_1.z.string({
            required_error: 'End date is required',
        }),
        endTime: zod_1.z.string({
            required_error: 'End time is required',
        }),
        categoryId: zod_1.z.string({
            required_error: 'Category Id is required',
        }),
    }),
});
const updateUpcomingOfferServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        unit: zod_1.z.string().optional(),
        startDate: zod_1.z.string().optional(),
        startTime: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        endTime: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
    }),
});
exports.UpcomingOfferServiceValidation = {
    createUpcomingOfferServiceValidation,
    updateUpcomingOfferServiceValidation,
};
