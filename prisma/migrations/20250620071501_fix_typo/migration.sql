/*
  Warnings:

  - You are about to drop the column `hightlights` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "hightlights",
ADD COLUMN     "highlights" TEXT;
