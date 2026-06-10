import { Request, Response } from "express";
interface AuthRequest extends Request {
    userId?: string;
}
declare const CartController: {
    getCart(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    createCart(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateCart(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteCart(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    clearCart(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
};
export default CartController;
//# sourceMappingURL=controller.cart.d.ts.map