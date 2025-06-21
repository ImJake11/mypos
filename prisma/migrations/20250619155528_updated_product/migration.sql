/*
  Warnings:

  - You are about to drop the column `productName` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productName",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';
