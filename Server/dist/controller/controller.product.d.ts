import { Request, Response } from "express";
interface AuthRequest extends Request {
    userId?: string;
}
declare const ProductController: {
    getProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getProducts(req: Request, res: Response): Promise<void>;
    createProduct(req: AuthRequest, res: Response): Promise<void>;
    updateProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    addReview(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
export default ProductController;
//# sourceMappingURL=controller.product.d.ts.map