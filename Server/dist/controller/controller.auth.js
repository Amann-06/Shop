"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config_1.default.emailUser,
        pass: config_1.default.emailPass
    }
});
function generateOTP() {
    return Math.floor(Math.random() * 900000) + 100000;
}
const AuthController = {
    async signup(req, res) {
        const existingUser = await user_1.User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        });
        if (existingUser) {
            return res.status(409).json({
                type: "error",
                message: "Username or email already exists"
            });
        }
        const newUser = new user_1.User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt_1.default.hashSync(req.body.password, 10)
        });
        try {
            const user = await newUser.save();
            const { password, ...data } = user.toObject();
            const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.jwtSecret, { expiresIn: "7d" });
            res.status(201).json({
                type: "success",
                message: "Account created",
                accessToken
            });
        }
        catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    },
    async login(req, res) {
        try {
            const user = await user_1.User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json({
                    type: "error",
                    message: "User not found"
                });
            }
            if (!bcrypt_1.default.compareSync(req.body.password, user.password)) {
                return res.status(400).json({
                    type: "error",
                    message: "Password incorrect"
                });
            }
            const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.jwtSecret, { expiresIn: "7d" });
            const { password, ...data } = user.toObject();
            res.status(200).json({
                type: "success",
                message: "Login successfully",
                data,
                accessToken
            });
        }
        catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    },
    async sendVerificationCode(req, res) {
        try {
            let user;
            if (req.body.email)
                user = await user_1.User.findOne({ email: req.body.email });
            else
                user = await user_1.User.findById(req.body.id);
            if (!user) {
                return res.status(404).json({
                    type: "error",
                    message: "User doesn't exist"
                });
            }
            const otp = generateOTP();
            user.resetOtp = otp.toString();
            user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
            await user.save();
            await transporter.sendMail({
                from: config_1.default.emailUser,
                to: user.email,
                subject: "Verification code for password reset",
                html: `
                    <div style="font-family: Arial, sans-serif">
                        <h2>Password Reset Request</h2>
                        <p>Your verification code is:</p>
                        <h1>${otp}</h1>
                        <p>This verification code is valid for 10 minutes.</p>
                        <p>If you didn't request a password reset, ignore this email.</p>
                    </div>
                `
            });
            return res.status(200).json({
                type: "success",
                message: "OTP sent successfully",
                userId: user._id
            });
        }
        catch (err) {
            return res.status(500).json({
                type: "error",
                message: "Something went wrong",
                err
            });
        }
    },
    async verifyVerificationCode(req, res) {
        try {
            console.log("BODY:", req.body);
            console.log("OTP:", req.body.otp);
            const user = await user_1.User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    type: "error",
                    message: "User not found"
                });
            }
            if (String(user.resetOtp) !== String(req.body.otp)) {
                return res.status(400).json({
                    type: "error",
                    message: "Verification code is incorrect"
                });
            }
            if (!user.resetOtpExpires || Date.now() > user.resetOtpExpires.getTime()) {
                return res.status(400).json({
                    type: "error",
                    message: "Verification code is expired"
                });
            }
            const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.jwtSecret, { expiresIn: "7d" });
            res.status(200).json({
                type: "success",
                message: "Password changed successfully",
                accessToken
            });
        }
        catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    },
    async forgetPassword(req, res) {
        try {
            const user = await user_1.User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({
                    type: "error",
                    message: "User doesn't exists"
                });
            }
            user.password = await bcrypt_1.default.hashSync(req.body.newPassword, 10);
            await user.save();
            res.status(200).json({
                type: "success",
                message: "Password changed successfully"
            });
        }
        catch (err) {
            res.status(500).json({
                type: "error",
                message: "Something went wrong please try again",
                err
            });
        }
    },
    async changePassword(req, res) {
        const user = await user_1.User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({
                type: "error",
                message: "User doesn't exists"
            });
        }
        user.password = await bcrypt_1.default.hashSync(req.body.newPassword, 10);
        await user.save();
        res.status(200).json({
            type: "success",
            message: "Password changed successfully"
        });
    }
};
exports.default = AuthController;
//# sourceMappingURL=controller.auth.js.map