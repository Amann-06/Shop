import { Router } from "express";
import CartController from "../controller/controller.cart";
const router = Router();

router.get('/:userId',CartController.getCart);
router.post('/',CartController.createCart);
router.put('/:id',CartController.updateCart);
router.delete('/:id',CartController.deleteCart);

export default router;