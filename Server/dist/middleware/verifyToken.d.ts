import { NextFunction, Request, Response } from "express";
export interface AuthRequest extends Request {
    userId?: string;
}
declare const authenticationVerifier: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
declare const accessLevelVerifier: (req: AuthRequest, res: Response, next: NextFunction) => void;
export { accessLevelVerifier, authenticationVerifier };
//# sourceMappingURL=verifyToken.d.ts.map