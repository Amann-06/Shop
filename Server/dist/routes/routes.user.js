"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_user_1 = __importDefault(require("../controller/controller.user"));
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
router.get('/', verifyToken_1.authenticationVerifier, controller_user_1.default.getUser);
router.put('/:id', verifyToken_1.accessLevelVerifier, controller_user_1.default.updateUser);
router.post("/", verifyToken_1.authenticationVerifier, controller_user_1.default.addAddress);
router.delete('/:id', controller_user_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=routes.user.js.map