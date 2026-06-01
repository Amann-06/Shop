import { Request, Response } from "express";
declare const AuthController: {
    signup(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    sendVerificationCode(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyVerificationCode(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    forgetPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    changePassword(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
export default AuthController;
//# sourceMappingURL=controller.auth.d.ts.map