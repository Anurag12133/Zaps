import express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const app = express();
app.post("/", async (req: any, res: any) => {
  const zapId = req.params.zapId;
  await client.zapRun.create({
    data: {
      zapId: zapId,
    },
  });
});
