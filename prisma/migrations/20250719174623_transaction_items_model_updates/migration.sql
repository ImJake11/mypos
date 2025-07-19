-- AddForeignKey
ALTER TABLE "TransactionItems" ADD CONSTRAINT "TransactionItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
