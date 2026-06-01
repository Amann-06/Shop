"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_auth_1 = __importDefault(require("../controller/controller.auth"));
const router = (0, express_1.Router)();
router.post('/signup', controller_auth_1.default.signup);
router.post('/login', controller_auth_1.default.login);
router.post('/sendVerificationCode', controller_auth_1.default.sendVerificationCode);
router.post('/verifyVerificationCode', controller_auth_1.default.verifyVerificationCode);
router.post('/forgetPassword', controller_auth_1.default.forgetPassword);
router.post('/changePassword:id', controller_auth_1.default.changePassword);
exports.default = router;
//# sourceMappingURL=routes.auth.js.map