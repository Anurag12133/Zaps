"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const authMidddleware_1 = require("../authMidddleware");
const router = (0, express_1.Router)();
router.post("/sigup", (res, req) => {
    console.log("Sign up");
});
router.post("/sigin", (res, req) => {
    console.log("Sign in");
});
router.get("/user", authMidddleware_1.authMiddleware, (res, req) => {
    console.log("Data");
});
exports.userRouter = router;
