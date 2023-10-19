"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        blog: zod_1.z.string({
            required_error: 'Blog is required',
        }),
    }),
});
const updateBlogValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        blog: zod_1.z.string().optional(),
    }),
});
exports.BlogValidation = {
    createBlogValidation,
    updateBlogValidation,
};
