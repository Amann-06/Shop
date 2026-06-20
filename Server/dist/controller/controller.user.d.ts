import { Request, Response } from "express";
interface AuthRequest extends Request {
    userId?: string;
}
declare const userController: {
    getUser(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    addAddress(req: AuthRequest, res: Response): Promise<void>;
    updateUser(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
};
export default userController;
//# sourceMappingURL=controller.user.d.ts.map