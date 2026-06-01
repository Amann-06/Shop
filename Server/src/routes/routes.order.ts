import { Router } from "express";
import orderController from "../controller/controller.order";
const router = Router();

router.get('/:userId',orderController.getOrder);
router.post('/',orderController.createOrder);
router.put('/:id',orderController.updateOrder);
router.delete('/:id',orderController.deleteOrder);

export default router;
