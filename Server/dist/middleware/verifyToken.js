"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationVerifier = exports.accessLevelVerifier = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const authenticationVerifier = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            type: "error",
            message: "No token provided"
        });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            type: "error",
            message: "Token missing"
        });
    }
    jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret, (err, decoded) => {
        if (err || !decoded || typeof decoded === "string") {
            return res.status(401).json({
                type: "error",
                message: "Invalid token"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
exports.authenticationVerifier = authenticationVerifier;
const accessLevelVerifier = (req, res, next) => {
    authenticationVerifier(req, res, () => {
        if (req.userId !== req.params.id) {
            return res.status(403).json({
                type: "error",
                message: "You are not allowed to perform this task"
            });
        }
        next();
    });
};
exports.accessLevelVerifier = accessLevelVerifier;
//# sourceMappingURL=verifyToken.js.map