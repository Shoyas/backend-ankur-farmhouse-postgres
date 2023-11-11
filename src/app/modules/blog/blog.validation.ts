import { z } from 'zod';

const createBlogValidation = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  blog: z.string({
    required_error: 'Blog is required',
  }),
  userId: z.string({
    required_error: 'User ID is required',
  }),
  contentImg: z.string().optional(),
});

const updateBlogValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    blog: z.string().optional(),
  }),
});

export const BlogValidation = {
  createBlogValidation,
  updateBlogValidation,
};
