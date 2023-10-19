"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const createServiceValidation = zod_1.z.object({
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
        categoryId: zod_1.z.string({
            required_error: 'Category Id is required',
        }),
    }),
});
const updateServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        unit: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
    }),
});
exports.ServiceValidation = {
    createServiceValidation,
    updateServiceValidation,
};
