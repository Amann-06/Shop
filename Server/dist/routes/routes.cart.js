"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_cart_1 = __importDefault(require("../controller/controller.cart"));
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
router.get('/', verifyToken_1.authenticationVerifier, controller_cart_1.default.getCart);
router.post('/', verifyToken_1.authenticationVerifier, controller_cart_1.default.createCart);
router.put('/', verifyToken_1.authenticationVerifier, controller_cart_1.default.updateCart);
router.delete('/', verifyToken_1.authenticationVerifier, controller_cart_1.default.deleteCart);
router.delete('/clear', verifyToken_1.authenticationVerifier, controller_cart_1.default.clearCart);
exports.default = router;
//# sourceMappingURL=routes.cart.js.map