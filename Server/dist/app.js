"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config//config"));
const route_1 = require("./routes/route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/auth", route_1.authRouter);
app.use("/api/order", route_1.orderRouter);
app.use("/api/cart", route_1.cartRouter);
app.use("/api/product", route_1.productRouter);
app.use("/api/user", route_1.userRouter);
mongoose_1.default.connect(config_1.default.mongoUri).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
exports.default = app;
//# sourceMappingURL=app.js.map