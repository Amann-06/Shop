import { Router } from "express";
import AuthController from "../controller/controller.auth";
const router = Router();

router.post('/signup',AuthController.signup);
router.post('/login',AuthController.login);
router.post('/sendVerificationCode',AuthController.sendVerificationCode);
router.post('/forgetPassword',AuthController.forgetPassword);
router.post('/verifyVerificationCode/:id', AuthController.verifyVerificationCode);
router.post('/changePassword/:id', AuthController.changePassword);

export default router;