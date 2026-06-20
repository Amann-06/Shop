import { Router } from "express";
import ProductController from "../controller/controller.product";
import { authenticationVerifier } from "../middleware/verifyToken";
import { upload } from "../config/cloudinary";
import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";

const router = Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.post('/', authenticationVerifier, ProductController.createProduct);
router.put('/:id', authenticationVerifier, ProductController.updateProduct);
router.delete('/:id', authenticationVerifier, ProductController.deleteProduct);
router.post('/:id/review', authenticationVerifier, ProductController.addReview);

router.post("/upload-image", authenticationVerifier, upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ type: "error", message: "No file uploaded" });
        }
        const url = (req.file as any).path;
        res.status(200).json({ type: "success", url });
    } catch (err) {
        res.status(500).json({ type: "error", message: "Upload failed", err });
    }
});

export default router;