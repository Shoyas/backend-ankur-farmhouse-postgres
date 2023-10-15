import { z } from 'zod';

const createFeedbackValidation = z.object({
  body: z.object({
    feedback: z.string({
      required_error: 'Feedback is required',
    }),
  }),
});
const updateFeedbackValidation = z.object({
  body: z.object({
    feedback: z.string().optional(),
  }),
});

export const FeedbackValidation = {
  createFeedbackValidation,
  updateFeedbackValidation,
};
