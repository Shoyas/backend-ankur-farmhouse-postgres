import { z } from 'zod';

const createReviewAndRatingValidation = z.object({
  body: z.object({
    review: z.string({
      required_error: 'Review is required',
    }),
    rating: z.string({
      required_error: 'Rating is required',
    }),
    userId: z.string({
      required_error: 'User Id is required',
    }),
    serviceId: z.string({
      required_error: 'Service Id is required',
    }),
  }),
});

const updateReviewAndRatingValidation = z.object({
  body: z.object({
    review: z.string().optional(),
    rating: z.string().optional(),
    userId: z.string().optional(),
    serviceId: z.string().optional(),
  }),
});

export const ReviewAndRatingValidation = {
  createReviewAndRatingValidation,
  updateReviewAndRatingValidation,
};
