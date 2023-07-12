import express from 'express';
import saleOrder from './sale-orders';

const router = express.Router();

router.use('/sale-orders', saleOrder);

export default router;
