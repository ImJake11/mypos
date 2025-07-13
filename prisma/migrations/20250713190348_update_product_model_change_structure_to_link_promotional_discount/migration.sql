/*
  Warnings:

  - You are about to drop the column `productId` on the `PromotionalDiscount` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PromotionalDiscount" DROP CONSTRAINT "PromotionalDiscount_productId_fkey";

-- DropIndex
DROP INDEX "PromotionalDiscount_productId_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "promotionalDiscountID" TEXT;

-- AlterTable
ALTER TABLE "PromotionalDiscount" DROP COLUMN "productId";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_promotionalDiscountID_fkey" FOREIGN KEY ("promotionalDiscountID") REFERENCES "PromotionalDiscount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
