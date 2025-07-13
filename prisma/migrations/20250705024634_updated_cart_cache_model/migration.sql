/*
  Warnings:

  - Added the required column `userId` to the `CartCache` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartCache" ADD COLUMN     "userId" TEXT NOT NULL;
