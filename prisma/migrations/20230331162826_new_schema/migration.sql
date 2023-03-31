/*
  Warnings:

  - You are about to drop the column `ipAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastSeen` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ipAddress",
DROP COLUMN "lastSeen",
ADD COLUMN     "uid" TEXT;
