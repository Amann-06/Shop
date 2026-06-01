import { Request, Response } from "express";
declare const userController: {
    getUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateUser(req: Request, res: Response): Promise<void>;
    deleteUser(req: Request, res: Response): Promise<void>;
};
export default userController;
//# sourceMappingURL=controller.user.d.ts.map