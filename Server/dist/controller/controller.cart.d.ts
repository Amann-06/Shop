import { Request, Response } from "express";
declare const CartController: {
    getCart(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createCart(req: Request, res: Response): Promise<void>;
    updateCart(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteCart(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
export default CartController;
//# sourceMappingURL=controller.cart.d.ts.map