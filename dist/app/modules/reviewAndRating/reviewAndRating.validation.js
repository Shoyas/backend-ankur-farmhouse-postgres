"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingValidation = void 0;
const zod_1 = require("zod");
const createReviewAndRatingValidation = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string({
            required_error: 'Review is required',
        }),
        rating: zod_1.z.string({
            required_error: 'Rating is required',
        }),
        userId: zod_1.z.string({
            required_error: 'User Id is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'Service Id is required',
        }),
    }),
});
const updateReviewAndRatingValidation = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string().optional(),
        rating: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
        serviceId: zod_1.z.string().optional(),
    }),
});
exports.ReviewAndRatingValidation = {
    createReviewAndRatingValidation,
    updateReviewAndRatingValidation,
};
