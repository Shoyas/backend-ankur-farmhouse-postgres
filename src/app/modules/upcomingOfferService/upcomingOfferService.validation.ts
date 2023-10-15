import { z } from 'zod';

const createUpcomingOfferServiceValidation = z.object({
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
    startDate: z.string({
      required_error: 'Start date is required',
    }),
    startTime: z.string({
      required_error: 'Start time is required',
    }),
    endDate: z.string({
      required_error: 'End date is required',
    }),
    endTime: z.string({
      required_error: 'End time is required',
    }),
    categoryId: z.string({
      required_error: 'Category Id is required',
    }),
  }),
});

const updateUpcomingOfferServiceValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.number().optional(),
    unit: z.string().optional(),
    startDate: z.string().optional(),
    startTime: z.string().optional(),
    endDate: z.string().optional(),
    endTime: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const UpcomingOfferServiceValidation = {
  createUpcomingOfferServiceValidation,
  updateUpcomingOfferServiceValidation,
};
