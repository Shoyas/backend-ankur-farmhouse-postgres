import { Prisma, StatusEnum } from '@prisma/client';

export type ICreateOrderInput = {
  userId: string;
  orderedServices: Prisma.InputJsonValue;
  status: StatusEnum;
  createdAt: Date;
};

export type IOrderFilters = { 
  searchTerm?: string;
};
