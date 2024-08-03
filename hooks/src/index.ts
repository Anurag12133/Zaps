import express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const app = express();
app.post("/", async (req: any, res: any) => {
  const zapId = req.params.zapId;
  const body = req.body;
  await client.$transaction(async (tx) => {
    const run = await client.zapRun.create({
      data: {
        zapId: zapId,
      },
    });
    const zapOutbox = await client.zapOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });
});
