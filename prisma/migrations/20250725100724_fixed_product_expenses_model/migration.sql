/*
  Warnings:

  - A unique constraint covering the columns `[productID]` on the table `ProductExpenses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductExpenses_productID_key" ON "ProductExpenses"("productID");
