"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_product_1 = __importDefault(require("../controller/controller.product"));
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
router.get('/', controller_product_1.default.getProducts);
router.get('/:id', controller_product_1.default.getProduct);
router.post('/', verifyToken_1.authenticationVerifier, controller_product_1.default.createProduct);
router.put('/:id', verifyToken_1.authenticationVerifier, controller_product_1.default.updateProduct);
router.delete('/:id', verifyToken_1.authenticationVerifier, controller_product_1.default.deleteProduct);
router.post('/:id/review', verifyToken_1.authenticationVerifier, controller_product_1.default.addReview);
exports.default = router;
//# sourceMappingURL=routes.product.js.map