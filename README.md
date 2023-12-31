## Ankur Farmhouse - An agro products service site's Backend

---

## Live Server: https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app

### Features:

- Error Handling.

- CRUD Operations on Blogs, Categories, Feedbacks, Orders, ReviewsAndRatting, Services, UpcomingOfferOrders, UpcomingOfferServices, Users.

- Auth Service with access token.

- Restricting route according to user permission.

- Hashing sensitive database information for getting more secure.

## Let's See ERDiagram: https://drive.google.com/file/d/1-ma55Mz__RTdzjDomLP2LNV5KDAX465E/view?usp=sharing

## Let's See The Motivation: https://docs.google.com/document/d/1DQJbnK0dP0a33nwZZDucvqSxnHDEWl--6EHDIRr8UUo/edit?usp=sharing

## Technologies:

- TypeScript
- Postgres as Database
- Prisma as the Object Relation Model (ORM)
- Node.JS
- Express.JS
- Bcrypt
- JSONwebtoken
- Git
- Supabase

## Live Link:

**Application Routes:**

**Auth**

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/auth/signup (POST)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/auth/signin (POST)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/auth/change-password (POST)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/users/profile (GET)

**User**

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/users (GET)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/users/ce6a41c3-e2f7-497f-a567-ab39b237757b (Single GET) Include an id that is saved in database
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/users/ce6a41c3-e2f7-497f-a567-ab39b237757b (PATCH)
- https:// backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/users/ce6a41c3-e2f7-497f-a567-ab39b237757b (DELETE) Include an id that is saved in database

**Feedback**

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/feedbacks/create-feedback (POST)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/feedbacks?limit=10&sortOrder=asc&page=1 (GET)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/feedbacks/a1ac7a3f-c0b9-4078-a8cc-03e9b468360f (PATCH)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/feedbacks/a1ac7a3f-c0b9-4078-a8cc-03e9b468360f (DELETE)

**Blog**

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/blogs/create-blog (POST)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/blogs?limit=2&sortOrder=asc (ALL GET)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/blogs/c3db3e3b-6922-4656-9615-5f706964e582 (Single GET)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/blogs/c3db3e3b-6922-4656-9615-5f706964e582 (PATCH)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/blogs/c3db3e3b-6922-4656-9615-5f706964e582 (DELETE)

**Category**

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/categories/create-category (POST)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/categories?limit=2&sortOrder=asc (GET)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/categories/4e843c29-6b94-4877-abd2-30c2d778b7df (Single GET) Include an id that is saved in database
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/categories/4e843c29-6b94-4877-abd2-30c2d778b7df (PATCH)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/categories/4e843c29-6b94-4877-abd2-30c2d778b7df (DELETE) Include an id that is saved in database

**Service**

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/services/create-service (POST)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/services?limit=2&sortOrder=asc (ALL GET)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/services/4d73e3b2-051b-48d6-845a-9f5458bacd65 (SINGLE GET)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/categories/services-by-category/4e843c29-6b94-4877-abd2-30c2d778b7df (GET ALL Service BY Category)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/services/4d73e3b2-051b-48d6-845a-9f5458bacd65 (PATCH)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/services/4d73e3b2-051b-48d6-845a-9f5458bacd65 (DELETE)

**Orders**

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/orders/create-order (POST)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/orders (GET ALL by According User)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/orders/all-orders?limit=10&sortOrder=asc (GET ALL)
- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/orders/c1252d75-6163-42f4-9b89-e84b618ab511 (DELETE By OrderID)

**Upcoming Offer Service**

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/upcoming-offer-services/create-upcoming-offer-service (POST)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/upcoming-offer-services (GET ALL)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/upcoming-offer-services/db33f60a-bfbd-4aff-b38c-95ceda46431d (GET Single)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/upcoming-offer-services/db33f60a-bfbd-4aff-b38c-95ceda46431d (UPDATE)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/upcoming-offer-services/db33f60a-bfbd-4aff-b38c-95ceda46431d (DELETE)

**Upcoming Offer Orders**

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/upcoming-offer-orders/booking-order (POST)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/upcoming-offer-orders (GET ALL by According User)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/upcoming-offer-orders/all-booking-orders?limit=10&sortOrder=asc (GET ALL)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/orders/09679a05-a8ae-4b06-a81f-8fd20f742619 (DELETE)

**Review And Rating**

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/reviews-and-ratings/create-review-and-rating (POST)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/reviews-and-ratings (GET ALL)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/reviews-and-ratings/a149e991-4078-4b68-b489-ba1bd297c4f7 (GET Single)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/reviews-and-ratings/a149e991-4078-4b68-b489-ba1bd297c4f7 (UPDATE)

- https://backend-ankur-farmhouse-postgres-3ld31mvzk-shoyas.vercel.app/api/v1/reviews-and-ratings/a149e991-4078-4b68-b489-ba1bd297c4f7 (DELETE)
