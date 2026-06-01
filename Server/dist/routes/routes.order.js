"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_order_1 = __importDefault(require("../controller/controller.order"));
const router = (0, express_1.Router)();
router.get('/:userId', controller_order_1.default.getOrder);
router.post('/', controller_order_1.default.createOrder);
router.put('/:id', controller_order_1.default.updateOrder);
router.delete('/:id', controller_order_1.default.deleteOrder);
exports.default = router;
//# sourceMappingURL=routes.order.js.map