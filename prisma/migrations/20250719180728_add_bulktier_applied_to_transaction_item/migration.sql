-- AlterTable
ALTER TABLE "TransactionItems" ADD COLUMN     "bulkTierID" TEXT;

-- AddForeignKey
ALTER TABLE "TransactionItems" ADD CONSTRAINT "TransactionItems_bulkTierID_fkey" FOREIGN KEY ("bulkTierID") REFERENCES "BulkTire"("id") ON DELETE SET NULL ON UPDATE CASCADE;
