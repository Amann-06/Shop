import { Request, Response } from "express";
interface AuthRequest extends Request {
    userId?: string;
}
declare const orderController: {
    getOrder(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createOrder(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateOrder(req: Request, res: Response): Promise<void>;
    deleteOrder(req: Request, res: Response): Promise<void>;
    cancelOrder(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
export default orderController;
//# sourceMappingURL=controller.order.d.ts.map