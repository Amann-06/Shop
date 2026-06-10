import { Router } from "express";
import CartController from "../controller/controller.cart";
import { authenticationVerifier } from "../middleware/verifyToken";
const router = Router();

router.get('/',authenticationVerifier,CartController.getCart);
router.post('/',authenticationVerifier,CartController.createCart);
router.put('/',authenticationVerifier,CartController.updateCart);
router.delete('/',authenticationVerifier,CartController.deleteCart);
router.delete('/clear',authenticationVerifier,CartController.clearCart);

export default router;