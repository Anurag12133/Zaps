import { Router } from "express";
import { Request, Response } from "express";
import { authMiddleware } from "../authMidddleware";

const router = Router();

router.post("/sigup", (res: Request, req: Response) => {
  console.log("Sign up");
});

router.post("/sigin", (res: Request, req: Response) => {
  console.log("Sign in");
});

router.get("/user", authMiddleware, (res: Request, req: Response) => {
  console.log("Data");
});

export const userRouter = router;
