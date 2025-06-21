-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "sellingPrice" INTEGER NOT NULL,
    "costPrice" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "bulkEnable" BOOLEAN NOT NULL DEFAULT false,
    "stock" INTEGER NOT NULL,
    "lowStock" INTEGER NOT NULL,
    "coverImage" TEXT NOT NULL,
    "photoSnapshots" TEXT[]
);

-- CreateTable
CREATE TABLE "Variants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "imageUrl" TEXT[],
    "isPositive" BOOLEAN NOT NULL DEFAULT false,
    "productId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BulkTire" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PromotionalDiscount" (
    "id" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "discountRate" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "productId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Variants_id_key" ON "Variants"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BulkTire_id_key" ON "BulkTire"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PromotionalDiscount_id_key" ON "PromotionalDiscount"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PromotionalDiscount_productId_key" ON "PromotionalDiscount"("productId");

-- AddForeignKey
ALTER TABLE "Variants" ADD CONSTRAINT "Variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulkTire" ADD CONSTRAINT "BulkTire_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionalDiscount" ADD CONSTRAINT "PromotionalDiscount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
