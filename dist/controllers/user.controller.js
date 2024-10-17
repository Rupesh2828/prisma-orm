"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, firstname, lastname, password, email } = req.body;
    if ([username, firstname, lastname, password, email].some((field) => (field === null || field === void 0 ? void 0 : field.trim()) === "")) {
        res.status(400).json({ message: "All fields are required" });
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                username,
                firstname,
                lastname,
                password: hashedPassword,
                email
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });
        res.status(201).json({
            message: "User created successfully",
            user
        });
    }
    catch (error) {
        console.error("Error while creating user:", error);
        res.status(500).json({ message: "Failed to create user" });
    }
});
exports.createUser = createUser;
