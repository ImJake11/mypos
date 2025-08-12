-- AlterTable
ALTER TABLE "TransactionItems" ADD COLUMN     "mainProductId" TEXT;

-- AddForeignKey
ALTER TABLE "TransactionItems" ADD CONSTRAINT "TransactionItems_mainProductId_fkey" FOREIGN KEY ("mainProductId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
