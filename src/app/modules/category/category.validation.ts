import { z } from 'zod';

const createCategoryValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateCategoryValidation = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidation,
  updateCategoryValidation,
};
