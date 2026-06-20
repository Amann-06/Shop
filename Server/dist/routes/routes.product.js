"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_product_1 = __importDefault(require("../controller/controller.product"));
const verifyToken_1 = require("../middleware/verifyToken");
const cloudinary_1 = require("../config/cloudinary");
const router = (0, express_1.Router)();
router.get('/', controller_product_1.default.getProducts);
router.get('/:id', controller_product_1.default.getProduct);
router.post('/', verifyToken_1.authenticationVerifier, controller_product_1.default.createProduct);
router.put('/:id', verifyToken_1.authenticationVerifier, controller_product_1.default.updateProduct);
router.delete('/:id', verifyToken_1.authenticationVerifier, controller_product_1.default.deleteProduct);
router.post('/:id/review', verifyToken_1.authenticationVerifier, controller_product_1.default.addReview);
router.post("/upload-image", verifyToken_1.authenticationVerifier, cloudinary_1.upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ type: "error", message: "No file uploaded" });
        }
        const url = req.file.path;
        res.status(200).json({ type: "success", url });
    }
    catch (err) {
        res.status(500).json({ type: "error", message: "Upload failed", err });
    }
});
exports.default = router;
//# sourceMappingURL=routes.product.js.map