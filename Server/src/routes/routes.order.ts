import { Router } from "express";
import orderController from "../controller/controller.order";
import { authenticationVerifier } from "../middleware/verifyToken";
const router = Router();

router.get('/',authenticationVerifier,orderController.getOrder);
router.post('/',authenticationVerifier,orderController.createOrder);
router.put('/:id',authenticationVerifier,orderController.updateOrder);
router.delete('/:id',authenticationVerifier,orderController.deleteOrder);
router.put("/order/:id/cancel",authenticationVerifier, orderController.cancelOrder);

export default router;
