-- CreateTable
CREATE TABLE "CartCache" (
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "mainProductID" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "promotionalDiscountID" TEXT,
    "bulkPricingID" TEXT,

    CONSTRAINT "CartCache_pkey" PRIMARY KEY ("cartId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CartCache_cartId_key" ON "CartCache"("cartId");

-- AddForeignKey
ALTER TABLE "CartCache" ADD CONSTRAINT "CartCache_mainProductID_fkey" FOREIGN KEY ("mainProductID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartCache" ADD CONSTRAINT "CartCache_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartCache" ADD CONSTRAINT "CartCache_promotionalDiscountID_fkey" FOREIGN KEY ("promotionalDiscountID") REFERENCES "PromotionalDiscount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartCache" ADD CONSTRAINT "CartCache_bulkPricingID_fkey" FOREIGN KEY ("bulkPricingID") REFERENCES "BulkTire"("id") ON DELETE SET NULL ON UPDATE CASCADE;
