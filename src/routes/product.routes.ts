import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validation.middleware';
import { CreateProductSchema, UpdateProductSchema } from '../schemas/product.schema';

const router = Router();
const productController = new ProductController(new ProductService());

router.get('/', productController.findAll.bind(productController));
router.get('/:id', productController.findOne.bind(productController));

// Protected routes
router.use(authMiddleware);
router.post('/', validateRequest(CreateProductSchema), productController.create.bind(productController));
router.put('/:id', validateRequest(UpdateProductSchema), productController.update.bind(productController));
router.delete('/:id', productController.delete.bind(productController));

export default router;