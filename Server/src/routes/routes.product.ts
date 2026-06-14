import { Router } from "express";
import ProductController from "../controller/controller.product";
import { authenticationVerifier } from "../middleware/verifyToken";
const router = Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.post('/', authenticationVerifier, ProductController.createProduct);
router.put('/:id', authenticationVerifier, ProductController.updateProduct);
router.delete('/:id', authenticationVerifier, ProductController.deleteProduct);
router.post('/:id/review', authenticationVerifier, ProductController.addReview);

export default router;