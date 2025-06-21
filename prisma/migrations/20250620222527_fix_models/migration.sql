/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `BulkTire` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `Variants` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "BulkTire_productId_key" ON "BulkTire"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Variants_productId_key" ON "Variants"("productId");
