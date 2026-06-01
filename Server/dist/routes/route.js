"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.productRouter = exports.userRouter = exports.orderRouter = exports.cartRouter = void 0;
const routes_cart_1 = __importDefault(require("./routes.cart"));
exports.cartRouter = routes_cart_1.default;
const routes_order_1 = __importDefault(require("./routes.order"));
exports.orderRouter = routes_order_1.default;
const routes_user_1 = __importDefault(require("./routes.user"));
exports.userRouter = routes_user_1.default;
const routes_product_1 = __importDefault(require("./routes.product"));
exports.productRouter = routes_product_1.default;
const routes_auth_1 = __importDefault(require("./routes.auth"));
exports.authRouter = routes_auth_1.default;
//# sourceMappingURL=route.js.map