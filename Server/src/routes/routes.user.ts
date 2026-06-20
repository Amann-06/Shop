import { Router } from "express";
import userController from "../controller/controller.user";
import { accessLevelVerifier, authenticationVerifier } from "../middleware/verifyToken";
const router = Router();

router.get('/',authenticationVerifier,userController.getUser);
router.put('/:id',accessLevelVerifier,userController.updateUser);
router.post("/",authenticationVerifier,userController.addAddress);
router.delete('/:id',userController.deleteUser);

export default router;