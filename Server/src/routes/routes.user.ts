import { Router } from "express";
import userController from "../controller/controller.user";
import { accessLevelVerifier } from "../middleware/verifyToken";
const router = Router();

router.get('/:id',userController.getUser);
router.put('/:id',accessLevelVerifier,userController.updateUser);
router.delete('/:id',userController.deleteUser);

export default router;