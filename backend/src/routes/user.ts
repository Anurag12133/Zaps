import { Router } from "express";
import { Request, Response } from "express";
import { authMiddleware } from "../authMidddleware";
import { signupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

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
  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );

  res.json({
    token: token,
  });
});

router.get("/user", authMiddleware, async (req: Request, res: Response) => {
  //@ts-ignore
  const id = req.id;

  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });
  res.json({
    user,
  });
});

export const userRouter = router;
