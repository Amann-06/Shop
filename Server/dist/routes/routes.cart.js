"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_cart_1 = __importDefault(require("../controller/controller.cart"));
const router = (0, express_1.Router)();
router.get('/:userId', controller_cart_1.default.getCart);
router.post('/', controller_cart_1.default.createCart);
router.put('/:id', controller_cart_1.default.updateCart);
router.delete('/:id', controller_cart_1.default.deleteCart);
exports.default = router;
//# sourceMappingURL=routes.cart.js.map