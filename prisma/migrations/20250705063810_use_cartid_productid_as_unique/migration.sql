/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productId]` on the table `CartCache` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartCache_cartId_productId_key" ON "CartCache"("cartId", "productId");
