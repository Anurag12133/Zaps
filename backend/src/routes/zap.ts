import { Router } from "express";
import { Request, Response } from "express";
import { authMiddleware } from "../authMidddleware";

const router = Router();

router.post("/", authMiddleware, (res: Request, req: Response) => {
  console.log("Zap");
});

router.get("/", authMiddleware, (res: Request, req: Response) => {
  console.log("Zap Data");
});

export const zapRouter = router;
