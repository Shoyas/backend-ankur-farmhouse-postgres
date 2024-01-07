import { NextFunction, Request, Response } from 'express';
import { PaymentService } from './payment.service';

const initPayment = async (req: Request, res: Response, next: NextFunction) => {
  const result = await PaymentService.initPayment();
  res.send(result);
};

export const PaymentController = {
  initPayment,
};
