import { z } from 'zod';

const createServiceValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    unit: z.string({
      required_error: 'Unit is required',
    }),
    categoryId: z.string({
      required_error: 'Category Id is required',
    }),
  }),
});

const updateServiceValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.number().optional(),
    unit: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const ServiceValidation = {
  createServiceValidation,
  updateServiceValidation,
};
