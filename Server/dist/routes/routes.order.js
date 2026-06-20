"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_order_1 = __importDefault(require("../controller/controller.order"));
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
router.get('/', verifyToken_1.authenticationVerifier, controller_order_1.default.getOrder);
router.post('/', verifyToken_1.authenticationVerifier, controller_order_1.default.createOrder);
router.put('/:id', verifyToken_1.authenticationVerifier, controller_order_1.default.updateOrder);
router.delete('/:id', verifyToken_1.authenticationVerifier, controller_order_1.default.deleteOrder);
router.put("/order/:id/cancel", verifyToken_1.authenticationVerifier, controller_order_1.default.cancelOrder);
exports.default = router;
//# sourceMappingURL=routes.order.js.map