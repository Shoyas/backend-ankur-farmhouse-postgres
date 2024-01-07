import express from 'express';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.post('/init', PaymentController.initPayment);
router.get('/webhook', PaymentController.webhook);

export const PaymentRoutes = router;
