import { Request, Response } from "express";
declare const ProductController: {
    getProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getProducts(req: Request, res: Response): Promise<void>;
    createProduct(req: Request, res: Response): Promise<void>;
    updateProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
export default ProductController;
//# sourceMappingURL=controller.product.d.ts.map