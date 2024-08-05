import { Router } from "express";
import { Request, Response } from "express";
import { authMiddleware } from "../authMidddleware";
import { signupSchema } from "../types";
import { prismaClient } from "../db";

const router = Router();

router.post("/sigup", async (req: Request, res: Response) => {
  const body = req.body.email;
  const parsedData = signupSchema.safeParse(body);

  if (!parsedData) {
    return res.json({
      message: "Incorrect Credentials",
    });
  }
  const ExsistingUser = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data?.username,
    },
  });
  if (ExsistingUser) {
    return res.status(403).json({
      message: "User Already exsist.",
    });
  }

  await prismaClient.user.create({
    data: {
      email: parsedData.data?.username || "",
      password: parsedData.data?.password || "",
      name: parsedData.data?.name || "",
    },
  });
});

router.post("/sigin", async (req: Request, res: Response) => {
  const body = req.body.email;
  const parsedData = signupSchema.safeParse(body);

  if (!parsedData) {
    return res.json({
      message: "Incorrect Credentials",
    });
  }
  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data?.username,
      password: parsedData.data?.password,
    },
  });

  if (!user) {
    return res.status(411).json({
      message: "Wrong Credentials !",
    });
  }
});

router.get("/user", authMiddleware, (req: Request, res: Response) => {
  console.log("Data");
});

export const userRouter = router;
