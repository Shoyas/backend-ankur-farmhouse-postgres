import { Prisma, upcomingOfferStatusEnum } from '@prisma/client';

export type ICreateUpcomingOfferOrderInput = {
  userId: string;
  upcomingOfferServices: Prisma.InputJsonValue;
  upcomingOfferStatus: upcomingOfferStatusEnum;
  takingScheduledDate: string;
  createdAt: Date;
};

export type IUpcomingOfferOrderFilters = {
  searchTerm?: string;
};
