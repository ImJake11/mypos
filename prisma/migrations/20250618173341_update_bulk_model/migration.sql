/*
  Warnings:

  - You are about to drop the column `bulkEnable` on the `Product` table. All the data in the column will be lost.
  - Added the required column `discount` to the `BulkTire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BulkTire" ADD COLUMN     "discount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "bulkEnable",
ADD COLUMN     "bulkEnabled" BOOLEAN NOT NULL DEFAULT false;
