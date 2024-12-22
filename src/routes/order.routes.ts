import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validation.middleware';
import { CreateOrderSchema, UpdateOrderSchema } from '../schemas/order.schema';

const router = Router();
const orderController = new OrderController(new OrderService());

router.use(authMiddleware);

router.post('/', validateRequest(CreateOrderSchema), orderController.createOrder.bind(orderController));
router.get('/', orderController.getOrders.bind(orderController));
router.get('/:id', orderController.getOrderById.bind(orderController));
router.put('/:id', validateRequest(UpdateOrderSchema), orderController.updateOrder.bind(orderController));
router.delete('/:id', orderController.cancelOrder.bind(orderController));

export default router;