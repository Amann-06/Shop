import { Request, Response } from "express";
declare const orderController: {
    getOrder(req: Request, res: Response): Promise<void>;
    createOrder(req: Request, res: Response): Promise<void>;
    updateOrder(req: Request, res: Response): Promise<void>;
    deleteOrder(req: Request, res: Response): Promise<void>;
};
export default orderController;
//# sourceMappingURL=controller.order.d.ts.map