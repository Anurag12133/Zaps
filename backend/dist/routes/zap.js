"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const authMidddleware_1 = require("../authMidddleware");
const router = (0, express_1.Router)();
router.post("/", authMidddleware_1.authMiddleware, (res, req) => {
    console.log("Zap");
});
router.get("/", authMidddleware_1.authMiddleware, (res, req) => {
    console.log("Zap Data");
});
exports.zapRouter = router;
