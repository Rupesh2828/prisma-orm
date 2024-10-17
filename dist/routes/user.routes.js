"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = require("../controllers/user.controller.js");
const router = (0, express_1.Router)();
router.route("/create-user").post(user_controller_js_1.createUser);
exports.default = router;
