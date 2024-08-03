/*
  Warnings:

  - The primary key for the `Action` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Action` table. All the data in the column will be lost.
  - The primary key for the `Trigger` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appId` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - The primary key for the `Zap` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `actionId` on the `Zap` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Zap` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Zap` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Zap` table. All the data in the column will be lost.
  - You are about to drop the `App` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[zapId]` on the table `Trigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `actionId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zapId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `triggerId` to the `Trigger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zapId` to the `Trigger` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_appId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_appId_fkey";

-- DropForeignKey
ALTER TABLE "Zap" DROP CONSTRAINT "Zap_actionId_fkey";

-- DropForeignKey
ALTER TABLE "Zap" DROP CONSTRAINT "Zap_triggerId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Action" DROP CONSTRAINT "Action_pkey",
DROP COLUMN "appId",
DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "actionId" TEXT NOT NULL,
ADD COLUMN     "zapId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Action_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Action_id_seq";

-- AlterTable
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_pkey",
DROP COLUMN "appId",
DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "triggerId" TEXT NOT NULL,
ADD COLUMN     "zapId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Trigger_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Zap" DROP CONSTRAINT "Zap_pkey",
DROP COLUMN "actionId",
DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "triggerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Zap_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Zap_id_seq";

-- DropTable
DROP TABLE "App";

-- CreateTable
CREATE TABLE "AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvailableAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableTrigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_zapId_key" ON "Trigger"("zapId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
