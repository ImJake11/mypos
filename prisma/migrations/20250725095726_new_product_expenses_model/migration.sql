-- CreateTable
CREATE TABLE "ProductExpenses" (
    "id" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductExpenses_id_key" ON "ProductExpenses"("id");

-- AddForeignKey
ALTER TABLE "ProductExpenses" ADD CONSTRAINT "ProductExpenses_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
